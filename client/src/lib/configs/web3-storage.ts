'use server';

import { create } from '@web3-storage/w3up-client';
import { generateChallenge } from '../utils/helpers';

export const web3storage = async () => {
  const client = await create();

  const did = 'did:key:z6MkfNfd9PZtxXPc7qcrg59Rbi8LVeep8q2DcWiZyFnGJxQR';
  const account = await client.login('rockyessel76@gmail.com');

  //   await client.setCurrentSpace(did);
  await client.setCurrentSpace(did);

  const space = client.currentSpace();

  if (!space) return null;

  // wait for payment plan to be selected
  while (true) {
    const res = await account.plan.get();
    if (res.ok) break;
    console.log('Waiting for payment plan to be selected...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return client;
};

export const uploadFile = async (file: File) => {
  try {
    const ctx = await web3storage();

    if (!ctx) return null;

    const fileCid = await ctx.uploadFile(file);

    console.log('fileCid: ', fileCid.link().toString());

    return fileCid.link().toString();
  } catch (error) {
    console.log('error', error);
  }
};
