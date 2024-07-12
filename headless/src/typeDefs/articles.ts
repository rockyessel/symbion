export const Articles = `#graphql

type Article {
    id: ID!,
    title: String!,
    owner: ID!,
    createdBy: ID!,
    transferredBy: [ID!],
    slug: String!,
    tags: [String!],
    cover: String,
    category: String!,
    caption: String,
    audioUrl: String,
    publishedOn: String!,
    keywords: [String!],
    isTransferred: Boolean!,
    status: String!,
    createdAt: String!,
    updatedAt: String!,
    description: String,
    lang: String!,
    license: String!,
    licenseContent: String!,
    latestPublishedDate: String,
    otherPublications: [String!],
    hideComments: Boolean!,
    contributors: [ID!],
    visibility: String!,
    content: String!,
    isChatEnabled: Boolean!,
}

type Query {
    articles(id:ID!):[Article!],
    article(id:ID!): Article
}

`;
