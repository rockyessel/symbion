if (!process.env.SYMBION_GRAPHQL_URL) {
  throw Error('SYMBION_GRAPHQL_URL not provided');
}

export const SYMBION_GRAPHQL_URL = process.env.SYMBION_GRAPHQL_URL;

if (!process.env.SYMBION_API_TOKEN) {
  throw Error('SYMBION_API_TOKEN not provided');
}

export const SYMBION_API_TOKEN = process.env.SYMBION_API_TOKEN;
