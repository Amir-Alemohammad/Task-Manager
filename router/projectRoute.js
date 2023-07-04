const router = require("express").Router();


const {checkLogin} = require("../middlewares/autoLogin.js");
const projectController = require("../controllers/projectController.js");
const {upload_multer} = require("../modules/multer.js");

/**
 * @swagger
 *  components:
 *        schemas:
 *          createProject:
 *              type: object
 *              required:
 *                  -   Title
 *              properties:
 *                  Title:
 *                      type: string
 *                      description: write Title
 *                  Text:
 *                      type: string
 *                      description: write text
 *                  tags:
 *                      type: string
 *                      description: write tags
 *                  image:
 *                      type: file
 *                      description: upload file
 *          editProject:
 *              type: object
 *              required:
 *                  -   Title
 *              properties:
 *                  Title:
 *                      type: string
 *                      description: edit Title
 *                  Text:
 *                      type: string
 *                      description: edit Text
 *                  tags:
 *                      type: string
 *                      description: edit tags
 *                  image:
 *                      type: file
 *                      description: edit image
 *  
 */


/**
 * @swagger
 *  tags:
 *      name: Project Section
 *      description: with this section you can create , edit , remove and get list of project 
 */
/**
 * 
 * @swagger
 *  /project/create:
 *          post:
 *              summary: user create project
 *              tags: [Project Section]
 *              description: create Project
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/createProject' 
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
router.post("/create" , checkLogin , upload_multer ,projectController.createProject);


/**
 * 
 * @swagger
 *  /project/list:
 *          get:
 *              summary: user get list of all project
 *              tags: [Project Section]
 *              description: get list of all project
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

router.get("/list",checkLogin,projectController.getAllProject);

/**
 * 
 * @swagger
 *  /project/remove/{id}:
 *          delete:
 *              summary: user remove project
 *              tags: [Project Section]
 *              description: remove project with id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                      description: delete project with id
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


router.delete("/remove/:id",checkLogin,projectController.removeProject);


/**
 * 
 * @swagger
 *  /project/edit/{id}:
 *          put:
 *              summary: user edit project
 *              tags: [Project Section]
 *              description: edit project with id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                      description: delete project with id
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/editProject'
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

router.put("/edit/:id",checkLogin,upload_multer,projectController.updateProject);



module.exports = {
    projectRoute : router,
}