const { GraphQLObjectType, GraphQLSchema } = require("graphql");


const RootQuery = new  GraphQLObjectType({
    name: "RootQuery",
    fields: {

    },
});


const RootMutation = new  GraphQLObjectType({
    name: "Mutation",
    fields:{

    },
});

const graphqlSchema = new GraphQLSchema({
    query: "RootQuery",
    mutation: "Mutation"
});
module.exports = {
    graphqlSchema,
}