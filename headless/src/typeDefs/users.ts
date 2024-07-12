export const Users = `#graphql

type User {
    id: ID!,
    name: String!,
    username: String!,
    isDeactivate: Boolean,
    provider: String!,
    email: String!,
    bio: String!,
    image: String,
    createdAt: String!,
    lastUpdated: String!
}

type Query {
    users:[User!],
    user(userId:ID!): User
}
`;
