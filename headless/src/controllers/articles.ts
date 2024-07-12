import { ARTICLE_META } from '../config/env';
import { gearApi, getMeta } from '../config/gear';
import { ArticleArgs, IContext } from '../types';

const ARTICLE_PROGRAM_ID: `0x${string}` = `0xa1272eecbaee52d04454d051fc3f573d78a41b430d5bfeab8adb000de525d9a3`;
interface IResolveParams<T, A> {
  parent: T;
  args: A;
  context: IContext;
}

// interface IQuery {
//   programId: string;
//   payload: any;
// }

// export const queryData = async (source: string, query: IQuery) => {
//   const api = await gearApi();
//   const meta = await getMeta(source);

//   const payload = await api.programState.read(query, meta);
// };

export const getUserArticles = async (
  props: IResolveParams<any, ArticleArgs>
) => {
  const { args, parent, context } = props;
  console.log({ args, parent, context });

  const api = await gearApi();
  const meta = await getMeta(ARTICLE_META);
  const metadata = {
    programId: ARTICLE_PROGRAM_ID,
    payload: { GetArticleById: args.id },
  };
  const payload = await api.programState.read({ ...metadata }, meta);
  const json = payload.toHuman();

  if (!json) return null;
  const parseJson = JSON.parse(json.toString());
  return parseJson;
};
