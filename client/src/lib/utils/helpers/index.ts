import { nanoid } from 'nanoid';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { assignedMimeTypes, mimeTypes, supportedWallets } from '../constants';
import { IDIDCredentials, Wallet } from '@/types';
import CryptoJS from 'crypto-js';
import { ES256KSigner, hexToBytes } from 'did-jwt';
import axios from 'axios';
import { Descendant } from 'slate';
import { ElementNodeType } from '@/components/editor/types';

/**
 * Combines class names using `clsx` and merges Tailwind classes using `twMerge`.
 * @param {...ClassValue[]} inputs - List of class names to combine.
 * @returns {string} - A combined and merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a specified length, appending "..." if truncated.
 * @param {string} str - The string to be truncated.
 * @param {number} num - The maximum length of the truncated string.
 * @returns {string} - The truncated string with "..." appended if necessary.
 */
export const truncate = (str: string, num: number) => {
  if (!str) return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num).trimEnd() + '...';
};

/**
 * Sets the mimeType of a file if it is not provided or empty.
 * @param file - The file object.
 * @returns The updated file object with the mimeType set.
 */
export const fileMimeTypeSetter = (file: File): File => {
  // Check if the file object exists and if its mimeType is empty
  if (file && file.type === '') {
    const extension = file.name.toLowerCase().split('.').pop(); // Get the file extension
    const isMimeTypePresentInArr = mimeTypes?.includes(`${extension}`); // Check if the mimeType is present in the allowed mimeTypes array

    if (isMimeTypePresentInArr) {
      // If the mimeType is present in the allowed mimeTypes array, create a new File object with the updated mimeType
      const updatedFile = new File([file], file.name, {
        type: assignedMimeTypes[`${extension}`], // Assign the appropriate mimeType based on the extension
      });

      return updatedFile;
    }
  }

  return file; // Return the file object as-is if the mimeType is already provided or if it doesn't match the allowed mimeTypes
};

export const getFileExtensionNType = (name?: string, type?: string) => {
  if (name && type) {
    const fileExtension = name.split('.');
    if (fileExtension.length < 2) {
      return '';
    }
    const fileType = type.split('/').shift()!;
    const extension = fileExtension[fileExtension.length - 1].toLowerCase();
    return `${fileType} ${extension}`;
  }

  return '';
};

/**
 * Creates a slug from the input string for SEO-friendly URLs.
 * @param {string} input - The input string to create a slug from.
 * @returns {string} - The generated slug.
 */
export const createSlug = (input: string): string => {
  console.log('input: ', input);
  const slug = input
    ?.replaceAll(/[^a-zA-Z0-9-]/g, '-') // Replace non-alphanumeric characters with hyphens
    ?.replaceAll(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .toLowerCase() // Convert to lowercase
    .trim(); // Remove leading and trailing spaces
  return slug;
};

/**
 * Generates an error message for missing environment variables.
 * @param {string} envName - The name of the missing environment variable.
 * @returns {string} - The error message.
 */
export const envError = (envName: string) => {
  const message = `You have to set an environment variable for ${envName}, to use this application.`;
  return message;
};

// Check if the environment is Vercel production or standard production.
const isVercelProduction = process.env.VERCEL === '1';
const isStandardProduction = process.env.NODE_ENV === 'production';

// Determine if the environment is production.
export const isProduction = isVercelProduction || isStandardProduction;

// Define the development and production domains from environment variables.
const DEV_ENV = process.env.DEV_DOMAIN || process.env.NEXT_PUBLIC_DEV_DOMAIN;
const PRO_ENV =
  process.env.PRODUCTION_DOMAIN || process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN;

// Determine the domain based on the environment.
const DOMAIN = isProduction ? PRO_ENV : DEV_ENV;

// Check if the window object is defined (i.e., the code is running in a browser).
export const windowIsDefined = typeof window !== 'undefined';

/**
 * Constructs a domain URL with an optional path.
 * @param {string} [path] - Optional path to append to the domain URL.
 * @returns {string} - The constructed domain URL.
 * @throws {Error} - If the domain is not set or is an empty string.
 */
export const domainURL = (path?: string) => {
  const protocol = isProduction ? 'https' : 'http';
  // console.log('DOMAIN: ', DOMAIN);

  if (!DOMAIN) {
    throw new Error('Domain is not set or is an empty string');
  }

  let url: URL;
  if (path) {
    url = new URL(`${protocol}://${DOMAIN}${path}`);
  } else {
    url = new URL(`${protocol}://${DOMAIN}`);
  }

  return url.toString();
};

/**
 * Filters and groups accounts by their wallet names.
 * @param {InjectedAccountWithMeta[]} accounts - List of accounts to filter and group.
 * @returns {Wallet[]} - List of grouped wallets with their accounts.
 */
export const filterAndGroupAccounts = (
  accounts: InjectedAccountWithMeta[] | undefined
): Wallet[] => {
  const result: Wallet[] = [];
  const walletMap: { [key: string]: Wallet } = {};
  if (typeof accounts === 'undefined') return [];

  accounts.forEach((account) => {
    const { source } = account.meta;
    const walletNames = supportedWallets.map((w) => w.value);

    if (walletNames.includes(source)) {
      if (!walletMap[source]) {
        walletMap[source] = {
          name: source,
          accounts: [],
        };
      }
      walletMap[source].accounts.push(account);
    }
  });

  for (const key in walletMap) {
    result.push(walletMap[key]);
  }

  return result;
};

/**
 * Removes all commas from a given string.
 * @param {string} value - The string to remove commas from.
 * @returns {string} - The string without commas.
 */
export const removeCommas = (value: string) => {
  return value.replace(/,/g, '');
};

/**
 * A no-op function that returns void.
 */
export const returnVoid = (): void => {};

/**
 * Gets the last N characters of a string.
 * @param {string} value - The string to get characters from.
 * @param {number} limit - The number of characters to get.
 * @returns {string} - The last N characters of the string.
 */
export const getLastFourLetters = (value: string, limit: number): string => {
  if (value.length < limit) {
    return value;
  }
  return value.slice(-limit);
};

/**
 * Summarizes an address by truncating the middle part.
 * @param {string} address - The address to summarize.
 * @param {number} firstLimit - The number of characters to keep at the start.
 * @param {number} lastLimit - The number of characters to keep at the end.
 * @returns {string} - The summarized address.
 */
export const summarizedAddress = (
  address: string,
  firstLimit: number,
  lastLimit: number
) => {
  const truncatedAddress = truncate(address, firstLimit);
  const lastLimitAddress = getLastFourLetters(address, lastLimit);
  return `${truncatedAddress}${lastLimitAddress}`;
};

/**
 * Generates a fallback UUID if the `nanoid` function is unavailable.
 * @returns {string} - The generated fallback UUID.
 */
const getFallbackUUID = () => {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

/**
 * Generates a unique identifier using `nanoid` or a fallback UUID.
 * @returns {string} - The generated unique identifier.
 */
export const generatedValues = () => {
  if (typeof window === 'undefined') return nanoid();
  if (typeof window.crypto?.randomUUID !== 'function') return getFallbackUUID();
  return nanoid();
};

/**
 * Downloads an encrypted token as a file.
 * @param {string} encryptedToken - The encrypted token to download.
 */
export const downloadEncryptedToken = (encryptedToken: string) => {
  const blob = new Blob([encryptedToken], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${generatedValues()}.did`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * Encrypts a given string with a password.
 * @param {string} value - The string to encrypt.
 * @param {string} key - The encryption key.
 * @returns {string} - The encrypted string.
 */
export const encrypt = (value: string, key: string): string => {
  console.log('value: ', value);
  return CryptoJS.AES.encrypt(value, key).toString();
};

/**
 * Decrypts an encrypted string with a password.
 * @param {string} value - The encrypted string to decrypt.
 * @param {string} key - The decryption key.
 * @returns {string|null} - The decrypted string, or null if decryption fails.
 */
export const decrypt = (value: string, key: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, key);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    console.error('Error decrypting token:', error);
    return null;
  }
};

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} milliseconds - The delay duration in milliseconds.
 * @returns {Promise<void>} - A promise that resolves after the delay.
 */
export const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Calculates the expiration time in seconds based on the current time and a number of days.
 * @param {number} days - The number of days until expiration.
 * @returns {number} - The expiration time in seconds.
 */
export const getExpirationTime = (days: number) =>
  Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;

/**
 * Extracts the credential subject from the given credentials.
 * @param {IDIDCredentials} credentials - The credentials to extract the subject from.
 * @returns {Partial<IDIDCredentials>} - The extracted credential subject.
 */
export const getCredentialSubject = (
  credentials: IDIDCredentials
): Partial<IDIDCredentials> => {
  const { password, ...props } = credentials;
  const user: Partial<IDIDCredentials> = {
    ...props,
    id: `did:address:${credentials.address}`,
  };
  return user;
};

/**
 * Gets the issuer details for DID (Decentralized Identifier) using a private key.
 * @returns {object} - The issuer details including the DID and the signer.
 */
export const getIssuer = () => {
  const signer = ES256KSigner(hexToBytes(String(process.env.DID_PRIVATE_KEY)));
  return { did: 'did:web:deconnect.vercel.app', signer };
};

// Function to generate a challenge or message for the user to sign
export const generateChallenge = () => {
  return (
    'Sign this message to create your DID: ' +
    Math.random().toString(36).substr(2, 5)
  );
};

export const web3LinkBuilder = (cid: string) => {
  if (!cid) {
    throw new Error('CID is required. Value for `web3LinkBuilder` is empty.');
  }
  const url = `https://${cid}.ipfs.w3s.link`;
  // const url = `https://ipfs.io/ipfs/${cid}`;
  return url;
};

export const symbionURLBuilder = (cid: string) => {
  if (!cid) {
    throw new Error('CID is required. Value for `symbionURLBuilder` is empty.');
  }
  const url = domainURL(`/api/files/${cid}`);
  return url;
};

export const fileUpload = async (files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  }
  const { data } = await axios.post(domainURL('/api/files'), formData);
  return data;
};

export const extractTextFromNodes = (nodes: Descendant[]) => {
  let result = '';

  const extractText = (node: Descendant) => {
    // @ts-ignore
    if (node.text) {
      // @ts-ignore
      result += node.text;
      // @ts-ignore
    } else if (node.children && node.children.length > 0) {
      // @ts-ignore
      node.children.forEach((child) => extractText(child));
    }
  };

  nodes.forEach((node) => extractText(node));

  return result;
};

export const returnDescendant = (value: string | Descendant[]): Descendant[] => {
  if (typeof value === 'string') {
    const parsedDescendant: Descendant[] = JSON.parse(value);
    return parsedDescendant;
  }
  
  return value;
};
