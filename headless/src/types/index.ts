import { Request, Response } from 'express';

export interface IContext {
  req: Request;
  res: Response;
}

// Define types for your entities
export interface User {
  id: string;
  name: string;
  username: string;
  isDeactivate?: boolean;
  provider: string;
  email: string;
  bio: string;
  image?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface IArticle {
  id: string;
  title: string;
  owner: string;
  createdBy: string;
  transferredBy?: string[];
  slug: string;
  tags?: string[];
  cover?: string;
  category: string;
  caption?: string;
  audioUrl?: string;
  publishedOn: string;
  keywords?: string[];
  isTransferred: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  lang: string;
  license: string;
  licenseContent: string;
  latestPublishedDate?: string;
  otherPublications?: string[];
  hideComments: boolean;
  contributors?: string[];
  visibility: string;
  content: string;
  isChatEnabled: boolean;
}

export interface Blog {
  id: string;
  owner: string;
  createdBy: string;
  title: string;
  subdomain: string;
  customDomain?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  keywords?: string[];
  description: string;
  visibility?: string;
  status: string;
  niche: string;
  sponsors?: string[];
  favicon?: string;
}

export interface Org {
  owner: string;
  createdBy: string;
  name: string;
  username: string;
  pageType: string;
  category: string;
  readme?: string;
  tags?: string[];
  focusedTags?: string[];
  profile?: string;
  cover?: string;
  isPremium?: boolean;
  entryAmount: number;
  compareEntryAmount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  visibility: string;
  contactEmail?: string;
  website?: string;
  pageRules?: string;
  favicon?: string;
  title: string;
  description?: string;
}

// Define argument types
export interface UserArgs {
  userId: string;
}

export interface ArticleArgs {
  id: string;
}

export interface BlogArgs {
  blogId: string;
}

export interface OrgArgs {
  orgId: string;
}
