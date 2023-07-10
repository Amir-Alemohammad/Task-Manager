const { GraphQLList } = require("graphql")
const { projectType } = require("../typeDefs/project.type")
const ProjectModel = require("../../models/projects")

const projectResolver = {
    type : new GraphQLList(projectType),
    resolve : async () =>{
        return await ProjectModel.find()
    }
}
module.exports = {
    projectResolver
}
