// import { IResolvers } from "@graphql-tools/utils";
import { IArticle, ArticleArgs, IContext } from '../types';

// const getAllUsersArticle = async () => {};

export const Articles = {
  Query: {
    articles: async (
      parent: IArticle,
      args: ArticleArgs,
      context: IContext
    ): Promise<IArticle[]> => {
      console.log({ parent, args, context });
      console.log('context: ', context);
      // const token = context.req.headers['x-api-key'];
      const token = context.req.headers;
      console.log('token: ', token);

      // Replace the logic with your own implementation
      return [];
    },

    article: async (
      _: any,
      args: ArticleArgs,
      context: IContext
    ): Promise<IArticle> => {
      const token = context.req.headers['x-api-key'];
      console.log('token: ', token);

      console.log('args: ', args);

      const article: IArticle = {
        id: '',
        title: '',
        owner: '',
        createdBy: '',
        slug: '',
        category: '',
        publishedOn: '',
        isTransferred: false,
        status: '',
        createdAt: '',
        updatedAt: '',
        lang: '',
        license: '',
        licenseContent: '',
        hideComments: false,
        visibility: '',
        content: '',
        isChatEnabled: false,
      };

      return { ...article };
    },
  },
};
