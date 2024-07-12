import { mergeResolvers } from '@graphql-tools/merge';

import { Users } from './users.js';
import { Articles } from './articles.js';
import { Orgs } from './orgs.js';
import { Blogs } from './blogs.js';

export const resolvers = mergeResolvers([Users, Articles, Orgs, Blogs]);
