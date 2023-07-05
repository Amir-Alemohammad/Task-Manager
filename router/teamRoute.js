const router = require("express").Router();

const teamController = require("../controllers/teamController");
const {checkLogin} = require("../middlewares/autoLogin");
/**
 * @swagger
 *  components:
 *        schemas:
 *          createTeam:
 *              type: object
 *              required:
 *                  -   name
 *                  -   username
 *              properties:
 *                  name:
 *                      type: string
 *                      description: write you'r team name
 *                  username:
 *                      type: string
 *                      description: write you'r team username
 *                  Description:
 *                      type: string
 *                      description: write description for you'r team
 *                  
 *          
 *  
 */
/**
 * @swagger
 *  tags:
 *      name: Team Section
 *      description: with this section user can create , edit, invite , remove and get list of teams 
 */
/**
 * 
 * @swagger
 *  /team/create:
 *          post:
 *              summary: user create team
 *              tags: [Team Section]
 *              description: create team
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/createTeam'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createTeam' 
 *             
 *              responses:
 *                  200:
 *                      description: Success
 *                  400:
 *                      description: Bad Request 
 *                  401:
 *                      description: Unauthorization
 *                  500:
 *                      description: Internal Server Errro  
 */
router.post("/create",checkLogin,teamController.createTeam);

/**
 * 
 * @swagger
 *  /team/list:
 *          get:
 *              summary: user get list of all teams
 *              tags: [Team Section]
 *              description: get list of all teams 
 *             
 *              responses:
 *                  200:
 *                      description: Success
 *                  404:
 *                      description: Not Found 
 *                  401:
 *                      description: Unauthorization
 *                  500:
 *                      description: Internal Server Errro  
 */

router.get("/list",checkLogin,teamController.getTeamList);


/**
 * 
 * @swagger
 *  /team/me:
 *          get:
 *              summary: user get own teams
 *              tags: [Team Section]
 *              description: get own teams 
 *             
 *              responses:
 *                  200:
 *                      description: Success
 *                  404:
 *                      description: Not Found 
 *                  401:
 *                      description: Unauthorization
 *                  500:
 *                      description: Internal Server Errro  
 */
router.get("/me",checkLogin,teamController.getMyTeams);

/**
 * 
 * @swagger
 *  /team/invite/{teamId}/{username}:
 *          get:
 *              summary: user invite
 *              tags: [Team Section]
 *              description: user invite other users to join team 
 *              parameters:
 *                  -   in: path
 *                      name: teamId
 *                      type: string
 *                      required: true
 *                      description: you'r teamId
 *                  -   in: path
 *                      name: username
 *                      type: string
 *                      required: true
 *                      description: username for invite
 *              responses:
 *                  200:
 *                      description: Success
 *                  404:
 *                      description: Not Found 
 *                  401:
 *                      description: Unauthorization
 *                  400:
 *                      description: Bad Request
 *                  500:
 *                      description: Internal Server Errro  
 */
router.get("/invite/:teamId/:username",checkLogin,teamController.inviteUser);


/**
 * 
 * @swagger
 *  /team/delete/{id}:
 *          delete:
 *              summary: Delete Team
 *              tags: [Team Section]
 *              description: team owner can delete team by id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                      description: you'r teamId
 *              responses:
 *                  200:
 *                      description: Success
 *                  404:
 *                      description: Not Found 
 *                  401:
 *                      description: Unauthorization
 *                  500:
 *                      description: Internal Server Errro  
 */
router.delete("/delete/:id",checkLogin,teamController.deleteTeamById);

/**
 * 
 * @swagger
 *  /team/update/{teamId}:
 *          put:
 *              summary: Update Team
 *              tags: [Team Section]
 *              description: Update team by team id
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/createTeam'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createTeam'
 *              parameters:
 *                  -   in: path
 *                      name: teamId
 *                      type: string
 *                      required: true
 *                      description: you'r teamId
 *              responses:
 *                  200:
 *                      description: Success
 *                  404:
 *                      description: Not Found 
 *                  401:
 *                      description: Unauthorization
 *                  400:
 *                      description: Bad Request
 *                  500:
 *                      description: Internal Server Errro  
 */
router.put("/update/:teamId",checkLogin,teamController.updateTeam);


module.exports = {
    teamRoute : router,
}