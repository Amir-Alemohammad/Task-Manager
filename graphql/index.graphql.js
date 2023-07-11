const { GraphQLObjectType, GraphQLSchema, } = require("graphql");
const { projectResolver } = require("./queries/project.resolver");
const { teamResolver } = require("./queries/team.resolver");


const RootQuery = new  GraphQLObjectType({
    name: "RootQuery",
    fields: {
        projects : projectResolver,
        teams : teamResolver,
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