import { gql } from '@apollo/client';

export const getAllArticle = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      owner
      audioUrl
      createdAt
      updatedAt
      slug
    }
  }
`;
