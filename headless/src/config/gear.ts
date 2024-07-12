import { GearApi, ProgramMetadata } from '@gear-js/api';
import { VARA_TESTNET } from './env';

export const gearApi = async () =>
  await GearApi.create({
    providerAddress: VARA_TESTNET,
  });

export const getMeta = async (raw: string) => {
  const meta = `0x${raw}`;
  const metadata = ProgramMetadata.from(meta);
  return metadata;
};
