const { GraphQLList } = require("graphql")
const { teamType } = require("../typeDefs/team.type")
const teamModel = require("../../models/teams")

const teamResolver = {
    type : new GraphQLList(teamType),
    resolve : async () =>{
        return await teamModel.find()
    }
}
module.exports = {
    teamResolver
}
