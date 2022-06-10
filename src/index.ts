import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { context } from "./context";
import { schema } from "./schema";
export const app = new ApolloServer({
    schema,
    context,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const port = process.env.PORT || 3000;
app.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});