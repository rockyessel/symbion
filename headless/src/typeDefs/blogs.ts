export const Blogs = `#graphql

type Blog {
    id: ID!,
    owner: ID!,
    createdBy: ID!,
    title: String!,
    subdomain: String!,
    customDomain: String,
    category: String!,
    createdAt: String!,
    updatedAt: String!,
    keywords: [String!],
    description: String!,
    visibility: String,
    status: String!,
    niche: String!,
    # socials: Vec<Social>,
    sponsors: [ID!],
    favicon: String,
}

type Query {
    blogs:[Blog!],
    blog(blogId:ID!): Blog
}

`;
