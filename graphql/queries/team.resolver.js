const { GraphQLList } = require("graphql")
const { teamType } = require("../typeDefs/team.type")
const teamModel = require("../../models/teams");
const { checkLoginInGraphQL } = require("../../middlewares/autoLogin");

const teamResolver = {
    type : new GraphQLList(teamType),
    resolve : async (_,args,context) =>{
        const {req} = context;
        req.user = await checkLoginInGraphQL(req)
        return await teamModel.find()
    }
}
module.exports = {
    teamResolver
}
