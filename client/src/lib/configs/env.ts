import { envError } from '../utils/helpers';

const env = process.env;

if (!env.VARA_TESTNET) {
  throw new Error(envError(`VARA_TESTNET`));
}
export const VARA_TESTNET = env.VARA_TESTNET;
