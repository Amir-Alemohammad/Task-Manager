const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const teamType = new GraphQLObjectType({
    name: "teamType",
    fields: {
        id:{type : GraphQLString},
        name:{type : GraphQLString},
        Description:{type : GraphQLString},
        username:{type : GraphQLString},
        users:{type : new GraphQLList(GraphQLString)},
        owner: {type : new GraphQLList(GraphQLString)},
    }
});
module.exports = {
    teamType,
}