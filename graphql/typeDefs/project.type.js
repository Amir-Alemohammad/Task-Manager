const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const projectType = new GraphQLObjectType({
    name: "projectType",
    fields: {
        id: {type : GraphQLString},
        Title: {type : GraphQLString},
        Text: {type: GraphQLString},
        Image: {type: GraphQLString},
        owner: {type: new GraphQLList(GraphQLString)},
        Team: {type: new GraphQLList(GraphQLString)},
        Private: {type: GraphQLBoolean},
        tags: {type: new GraphQLList(GraphQLString)}
    }
});
module.exports = {
    projectType,
}