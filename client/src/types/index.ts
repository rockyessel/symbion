import { HexString } from '@polkadot/util/types';
import {
  FC,
  ReactNode,
  PropsWithChildren,
  SVGProps,
  CSSProperties,
  ChangeEvent,
} from 'react';
import { Locale } from '../i18n.config';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
// import { DefaultLibp2pServices, HeliaLibp2p } from 'helia';
// import type { Libp2p } from '@libp2p/interface';

export type Account = InjectedAccountWithMeta;

// export type HeliaNodeType = HeliaLibp2p<Libp2p<DefaultLibp2pServices>>;

export interface ISocial {
  name: string;
  domain: string;
  icon: string;
  handler?: string;
  hide: boolean;
  showOnPost: boolean;
}

export interface Wallet {
  name: string;
  accounts: Account[];
}

export interface IChildrenProps<T = any> {
  children: ReactNode;
  params?: Partial<T>;
}

export interface IRootLayout {
  params: LocaleType;
  children: ReactNode;
}

export type LocaleType = { locale: Locale };

export type SVGComponent = FC<
  SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export type BaseComponentProps = PropsWithChildren & {
  className?: string;
};

export type PickPartial<T, K extends keyof T> = T | Pick<T, K>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Token = {
  id: string;
  ownerId: HexString;
  name: string;
  description: string;
  media: string;
  reference: string;
  approvedAccountIds: HexString[];
};

export type PolkadotWallets =
  | 'talisman'
  | 'polkadot-js'
  | 'subwallet-js'
  | 'enkrypt';

export type PolkadotIconProps = {
  address: string;
  className?: string;
  isAlternative?: boolean;
  size?: number;
  style?: CSSProperties;
};

export interface Circle {
  cx: number;
  cy: number;
  fill: string;
  r: number;
}

export interface Options {
  isAlternative?: boolean;
  size?: number;
}

export type IWalletId = PolkadotWallets;

export type IWalletExtensionContent = { name: string; SVG: SVGComponent };
export type Wallets = [IWalletId, IWalletExtensionContent][];

export type ISystemAccount = {
  consumers: number; // 0
  data: {
    feeFrozen: number | HexString; // 0
    free: number | HexString; // '0x...'
    miscFrozen: number | HexString; // 0
    reserved: number | HexString; //  8327965542000
  };
  nonce: number; // 94
  providers: number; // 1
  sufficients: number; // 0
};

export type SignInResponse = {
  accessToken: string;
  discord: string | null;
  username: string;
};

export type ShareLinkResponse = {
  link: string;
  registeredUserCount: number;
  remainingUsersToInvite: number;
};

export type LinkResponse = ShareLinkResponse & {
  expired?: boolean;
  freeze?: number;
  message?: string;
};

export type AuthResponse = {
  success: true;
  content: {
    user: {
      address: string;
      activities: {
        staked: boolean;
        raced: boolean;
        tictactoe: boolean;
      };
    };
  };
};

export type AvailableTokensResponse = {
  result: number;
};

export interface IDIDCredentials {
  id: `did:address:0x${string}`;
  name: string;
  email: string;
  address: AddressType;
  password: string;
  image?: string;
  bio?: string;
  authType?: string;
}

export interface IUserProps {
  id: `did:address:0x${string}`;
  name: string;
  email: string;
  image: string;
  address: AddressType;
  token: string;
}

export type AddressType = `0x${string}`;

// 'active', 'inactive', 'archived';

interface Media {
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  relatedTo: 'posts' | 'articles';
  relationId: AddressType;
}

export interface IPageCreate {
  owner: string;
  createdBy: string;
  name: string;
  username: string;
  pageType: string;
  category: string;
  readme: string;
  tags: string[];
  focusedTags: string[];
  profile: string;
  cover: string;
  socials: Social[];
  isPremium: boolean;
  entryAmount: string;
  compareEntryAmount: string;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
  visibility: VisibilityType;
  contactEmail: string;
  website: string;
  pageRules: string;
  favicon: string;
  title: string;
  description: string;
}

export type UpdatePropsType = undefined | string | string[] | any[] | any;

export interface IPage extends IPageCreate {
  id: string;
  members: AddressType[];
  articles: AddressType[];
  posts: AddressType[];
  events: AddressType[];
  admins: AddressType[];
  sponsors: AddressType[];
}

interface Social {
  name: string;
  domain: string;
  icon: string;
  handler: string;
  hide: boolean;
  showOnPost: boolean;
}

export type VisibilityType = 'Public' | 'Private' | 'Restricted';
export type StatusType = 'Active' | 'Inactive' | 'Archived';

export type InputEventType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export interface IArticle {
  id: AddressType;
  title: string;
  owner: AddressType;
  createdBy: AddressType;
  transferredBy?: AddressType;
  slug: string;
  tags: string[];
  cover: string;
  category: string;
  subCategory: string;
  caption: string;
  seoTitle: string;
  audioUrl: string;
  publishedOn: string;
  keywords: string[];
  isTransferred: boolean;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  description: string;
  lang: string;
  license: string;
  licenseContent: string;
  latestPublishedDate: string;
  otherPublications: string[];
  hideComments: boolean;
  contributors: `0x${string}`[];
  visibility: VisibilityType;
  content: string;
  isChatEnabled: boolean;
}

export interface IBlog {
  id: AddressType;
  owner: AddressType;
  createdBy: AddressType;
  title: string;
  subdomain: string;
  description: string;
  category: string;
  keywords: string[];
  created_at: string;
  updated_at: string;
  customDomain: string;
  visibility: VisibilityType;
  status: StatusType;
  niche: string;
  socials: string;
  sponsors: string;
  favicon: string;
}


export interface Option {
  name: VisibilityType | StatusType;
  info: string;
}
