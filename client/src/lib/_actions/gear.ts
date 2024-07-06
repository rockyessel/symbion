'use server';

import { GearApi, ProgramMetadata } from '@gear-js/api';
import { domainURL } from '../utils/helpers';
import { PAGE_PROGRAM_ID, USER_PROGRAM_ID } from '../utils/constants';
import { VARA_TESTNET } from '../configs/env';
import { AddressType } from '@/types';

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

export const getAllPages = async () => {
  const api = await gearApi();
  const meta = await getProgramMetadata(domainURL('/meta/deconnect_pages.meta.txt'));
  const payload = await api.programState.read({ programId: PAGE_PROGRAM_ID, payload: 'GetAllPages' }, meta);
  const programTypes = meta.getAllTypes();
  console.log('pageActions: ', JSON.parse(programTypes.DeconnectPagesIoPageAction as string));
  console.log('pageStateActions: ', JSON.parse(programTypes.DeconnectPagesIoPageStateAction as string));
  console.log('payload: ', payload.toJSON());
  const json = payload.toJSON() as unknown as any;
  return json.getAllPages;
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

export const getProgramMetadata = async (source: string) => {
  const response = await fetch(source);
  const raw = await response.text();
  const result = ProgramMetadata.from(`0x${raw}`);
  return result;
};
