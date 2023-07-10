const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { projectResolver } = require("./queries/project.resolver");


const RootQuery = new  GraphQLObjectType({
    name: "RootQuery",
    fields: {
        projects : projectResolver
    },
});


const RootMutation = new  GraphQLObjectType({
    name: "Mutation",
    fields:{
        
    },
    
});

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation,
});
module.exports = {
    graphqlSchema,
}