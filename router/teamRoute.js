const router = require("express").Router();

const teamController = require("../controllers/teamController");
const {checkLogin} = require("../middlewares/autoLogin");



router.post("/create",checkLogin,teamController.createTeam);

router.get("/list",checkLogin,teamController.getTeamList);

router.get("/me",checkLogin,teamController.getMyTeams);

router.get("/invite/:teamId/:username",checkLogin,teamController.inviteUser);

router.delete("/delete/:id",checkLogin,teamController.deleteTeamById);

router.get("/:id",checkLogin,teamController.getTeamById);


module.exports = {
    teamRoute : router,
}