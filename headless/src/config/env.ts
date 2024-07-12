import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.BLOG_META) {
  throw Error('BLOG_META not provided');
}
if (!process.env.ARTICLE_META) {
  throw Error('ARTICLE_META not provided');
}
if (!process.env.ORG_META) {
  throw Error('ORG_META not provided');
}
if (!process.env.USER_META) {
  throw Error('USER_META not provided');
}
if (!process.env.VARA_TESTNET) {
  throw Error('VARA_TESTNET not provided');
}

export const BLOG_META = process.env.BLOG_META;
export const ARTICLE_META = process.env.ARTICLE_META;
export const ORG_META = process.env.ORG_META;
export const USER_META = process.env.USER_META;
export const VARA_TESTNET = process.env.VARA_TESTNET;
