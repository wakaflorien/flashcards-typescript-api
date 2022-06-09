import { ApolloServer } from "apollo-server";
import { context } from "./context";

import { schema } from "./schema";
export const app = new ApolloServer({
    schema,
    context,
});

const port = 3000;
app.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});