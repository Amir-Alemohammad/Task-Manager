const { checkLogin } = require("../middlewares/autoLogin");
const userController = require("../controllers/userController");
const { upload_multer } = require("../modules/multer");


const router = require("express").Router();
/**
 * @swagger
 * components:
 *        schemas:
 *          editProfile:
 *              type: object
 *              required:
 *                  -   FullName
 *                  -   Email
 *                  -   PhoneNumber
 *              properties:
 *                  FullName:
 *                      type: string
 *                      description: write you'r firstname and lastname
 *                  Email:
 *                      type: string
 *                      description: write you'r email address
 *                  PhoneNumber:
 *                      type: string
 *                      description: write you'r phone number
 *          profileImage:
 *              type: object
 *              required:
 *                  -   image
 *              properties:
 *                  image:
 *                      type: file
 *                      description: you can upload image for you'r profil
 * 
 * 
 * 
 * 
 */
/**
* @swagger
*  tags:
*      name: User Section
*      description: with this section user can get profile , edit profile , change status request  
*/




/**
 * 
 * @swagger
 *  /user/profile:
 *          get:
 *              summary: user get profile
 *              tags: [User Section]
 *              description: user can get profile 
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
router.get("/profile", checkLogin,userController.getProfile);

/**
 * 
 * @swagger
 *  /user/edit-profile:
 *          post:
 *              summary: user edit profile
 *              tags: [User Section]
 *              description: user can edit profile
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/editProfile'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/editProfile'  
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
router.post("/edit-profile",checkLogin,userController.editProfile);

/**
 * 
 * @swagger
 *  /user/profile-image:
 *          post:
 *              summary: user upload profile image
 *              tags: [User Section]
 *              description: user can upload image for profile
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/profileImage'  
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
router.post("/profile-image",checkLogin,upload_multer,userController.uploadImage);


/**
 * 
 * @swagger
 *  /user/requests:
 *          get:
 *              summary: user get requests
 *              tags: [User Section]
 *              description: user can get requests 
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
router.get("/requests",checkLogin,userController.getAllinvites);


/**
 * 
 * @swagger
 *  /user/change-status-request/{id}/{status}:
 *          get:
 *              summary: user get requests
 *              tags: [User Section]
 *              description: user can get requests
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                      description: invite request id
 *                  -   in: path
 *                      name: status
 *                      type: string
 *                      requied: true
 *                      description: you can choose status between "accepted" and "rejected"  
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
router.get("/change-status-request/:id/:status",checkLogin,userController.changeRequest);

/**
 * 
 * @swagger
 *  /user/requests/{status}:
 *          get:
 *              summary: user get requests by status
 *              tags: [User Section]
 *              description: user can get requests by status
 *              parameters:
 *                  -   in: path
 *                      name: status
 *                      type: string
 *                      required: true
 *                      description: for see request by status enter status
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
router.get("/requests/:status",checkLogin,userController.getRequestsByStatus);




module.exports = {
    userRoute : router,
}