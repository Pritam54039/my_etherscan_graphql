  const { ApolloServer } = require("apollo-server");
  // Import schema from schema.graphql file
  const { importSchema } = require("graphql-import");
  const EtherDataSource = require("./datasource/ethDatasource");
  // Import schema from schema.graphql file
  const typeDefs = importSchema("./schema.graphql");

  require("dotenv").config();

  const resolvers = {
    Query: {
      // Get ether balance for an Ethereum address
      etherBalanceByAddress: (root, _args, { dataSources }) =>
        dataSources.ethDataSource.etherBalanceByAddress(),

      // Get total supply of ether on the Ethereum network
      totalSupplyOfEther: (root, _args, { dataSources }) =>
        dataSources.ethDataSource.totalSupplyOfEther(),

      // Get latest Ethereum price
      latestEthereumPrice: (root, _args, { dataSources }) =>
        dataSources.ethDataSource.getLatestEthereumPrice(),

      // Get average Ethereum block confirmation time
      blockConfirmationTime: (root, _args, { dataSources }) =>
        dataSources.ethDataSource.getBlockConfirmationTime(),
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      ethDataSource: new EtherDataSource(),
    }),
  });

  server.timeout = 0;
  server.listen("9000").then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
