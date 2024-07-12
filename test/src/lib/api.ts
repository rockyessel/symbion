'use server';

import { getAllArticle } from '@/graphql/query';
import { DocumentNode } from '@apollo/client';
import { GraphQLClient, Variables } from 'graphql-request';
import { SYMBION_API_TOKEN, SYMBION_GRAPHQL_URL } from './config';

export const symbionReq = async <T>(
  query: DocumentNode | string,
  variables: Variables
): Promise<T> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': SYMBION_API_TOKEN,
  };
  const client = new GraphQLClient(SYMBION_GRAPHQL_URL, { headers });
  const data = await client.request<T>(query, variables);
  return data;
};

interface IArticle {
  id: AddressType;
  name: string;
}

type AddressType = `0x${string}`;

export const getArticles = async (id: AddressType) => {
  const data = await symbionReq<IArticle>(getAllArticle, { id });
  return data;
};
