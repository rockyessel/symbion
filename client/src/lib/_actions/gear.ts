'use server';

import { GearApi, ProgramMetadata, CreateType } from '@gear-js/api';
import { domainURL } from '../utils/helpers';
import {
  BLOG_PROGRAM_ID,
  PAGE_PROGRAM_ID,
  USER_PROGRAM_ID,
} from '../utils/constants';
import { VARA_TESTNET } from '../configs/env';
import { AddressType, IBlog } from '@/types';
import type { HexString } from '@polkadot/util/types';
import { formatBalance } from '@polkadot/util';

export const gearApi = async () =>
  await GearApi.create({
    providerAddress: VARA_TESTNET,
  });

export const readAllUsers = async () => {
  const api = await gearApi();

  const meta = await getProgramMetadata(domainURL('/deconnect_users.meta.txt'));
  const payload = await api.programState.read(
    {
      programId: USER_PROGRAM_ID,
      payload: 'AllUsers',
    },
    meta
  );
  return payload.toHuman();
};

export type ISystemAccount = {
  nonce: number; // 94
  consumers: number; // 0
  providers: number; // 1
  sufficients: number; // 0
  data: {
    free: number | HexString; // '0x...'
    reserved: number | HexString; //  8327965542000
    frozen: number | HexString; // 0
    flags: number | HexString; // 0
  };
};

export const getBalance = async (address: AddressType) => {
  try {
    const api = await gearApi();

    const sysAccount = await api.query.system.account(address);
    const account = sysAccount.toJSON() as unknown as ISystemAccount;
    // TODO: handle error and display
    if (!account) return;
    const totalVARAToken = account.data.free;
    const frozenVARAToken = CreateType.create(
      'u128',
      account.data.frozen
    ).toString();
    const rawBalance = `${+totalVARAToken - +frozenVARAToken}`;

    const [unit] = api.registry.chainTokens;
    const [decimals] = api.registry.chainDecimals;

    const value = formatBalance(rawBalance.toString(), {
      decimals,
      forceUnit: unit,
      withSiFull: false,
      withSi: false,
      withUnit: unit,
    });

    const balance =  `${value.slice(0, -2)}`

    return balance;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPages = async () => {
  const api = await gearApi();
  const meta = await getProgramMetadata(
    domainURL('/meta/deconnect_pages.meta.txt')
  );
  const payload = await api.programState.read(
    { programId: PAGE_PROGRAM_ID, payload: 'GetAllPages' },
    meta
  );
  const programTypes = meta.getAllTypes();
  console.log(
    'pageActions: ',
    JSON.parse(programTypes.DeconnectPagesIoPageAction as string)
  );
  console.log(
    'pageStateActions: ',
    JSON.parse(programTypes.DeconnectPagesIoPageStateAction as string)
  );
  console.log('payload: ', payload.toJSON());
  const json = payload.toJSON() as unknown as any;
  return json.getAllPages;
};

export const getAllOwnerBlogs = async (
  owner: AddressType
): Promise<IBlog[]> => {
  const api = await gearApi();
  const meta = await getProgramMetadata(domainURL('/meta/blogs.meta.txt'));
  const payload = await api.programState.read(
    { programId: BLOG_PROGRAM_ID, payload: { GetAllBlogsByOwner: owner } },
    meta
  );

  const json = payload.toJSON() as unknown as any;
  console.log('json: ', json);
  return json.getAllBlogsByOwner;
};

export const getAllPageUsernames = async () => {
  const api = await gearApi();

  const meta = await getProgramMetadata(
    domainURL('/meta/deconnect_pages.meta.txt')
  );

  const payload = await api.programState.read(
    {
      programId: PAGE_PROGRAM_ID,
      payload: 'GetAllPageUsernames',
    },
    meta
  );

  console.log('payload: ', payload.toJSON());

  const json = payload.toHuman() as unknown as any;
  return json;
};

export const getPageById = async (pageId: AddressType) => {
  const api = await gearApi();

  const meta = await getProgramMetadata(
    domainURL('/meta/deconnect_pages.meta.txt')
  );
  const payload = await api.programState.read(
    {
      programId: PAGE_PROGRAM_ID,
      payload: {
        GetPageById: pageId,
      },
    },
    meta
  );

  const json = (await payload.toHuman()) as unknown as any;
  return json;
};

export const getOwnerBlogById = async (blogId: AddressType): Promise<IBlog> => {
  const api = await gearApi();
  const meta = await getProgramMetadata(domainURL('/meta/blogs.meta.txt'));
  const payload = await api.programState.read(
    {
      programId: BLOG_PROGRAM_ID,
      payload: { GetBlogById: blogId },
    },
    meta
  );
  const json = (await payload.toHuman()) as unknown as any;
  return json.GetBlogById;
};

export const getProgramMetadata = async (source: string) => {
  const response = await fetch(source);
  const raw = await response.text();
  const result = ProgramMetadata.from(`0x${raw}`);
  return result;
};
