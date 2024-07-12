import { mergeResolvers } from '@graphql-tools/merge';

import { Users } from './users';
import { Articles } from './articles';
import { Orgs } from './orgs';
import { Blogs } from './blogs';

export const resolvers = mergeResolvers([Users, Articles, Orgs, Blogs]);
