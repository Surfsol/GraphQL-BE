1. npm i graphql express-graphql express axios

2. npm i -D nodemon

3. scripts
   "start": "node server.js",
   "server":"nodemon server.js"

4. Server.js
   //github.com/graphql/express-graphql
   const express = require('express');
   const graphqlHTTP = require('express-graphql');
   //graphql: true gives access to localhost:5000/graphql
   const app = express();

app.use(
'/graphql',
graphqlHTTP({
schema,
graphiql: true,
}),
);

app.listen(4000);

5. schema.js
   //put graphql stuff
   //look at your api to determine objects you need to create
   //https://docs.spacexdata.com/?version=latest#5fc4c846-c373-43df-a10a-e9faf80a8b0a

   a. create object types
   b. root query - create endpoints, that have resolvers that will resolve our data
