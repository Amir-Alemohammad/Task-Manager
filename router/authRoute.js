const router = require("express").Router();

const authController = require("../controllers/authController.js");

/**
 * @swagger
 *  components:
 *      schemas:
 *          checkOtp:
 *              type: object
 *              required:
 *                  -   PhoneNumber
 *              properties:
 *                  PhoneNumber:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          login:
 *              type: object
 *              required:
 *                  -   PhoneNumber
 *                  -   code
 *              properties:
 *                  PhoneNumber:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP
 *          register:
 *              type: object
 *              required:
 *                  -   FullName
 *                  -   UserName
 *                  -   Email
 *                  -   PhoneNumber
 *                  -   Password
 *                  -   ConfirmPassword
 *          
 * 
 *              properties:
 *                  FullName:
 *                      type: string
 *                      description: you'r firstname and lastname
 *                  UserName:
 *                      type: string
 *                      description: you'r Username
 *                  Email:
 *                      type: string
 *                      description: you'r Email Address
 *                  PhoneNumber:
 *                      type: string
 *                      description: you'r PhoneNumber
 *                  Password:
 *                      type: string
 *                      description: you'r Password
 *                  ConfirmPassword:
 *                      type: string
 *                      description: Confirm Password
 *                  Rols:
 *                      type: string
 *                      description: you'r Roles
 *                  Skills:
 *                      type: string
 *                      description: you'r Skills
 *                  Teams:
 *                      type: string
 *                      description: you'r team
 * 
 *                  
 *                  
 *                  
 *                 
 *          
 *          
 */



/**
 * @swagger
 *  tags:
 *      name: User Authorization
 *      description: User Auth Section
 */

/**
 * @swagger
 * 
 *  /auth/register:
 *          post:
 *              summary: register user in user panel
 *              tags : [User Authorization]
 *              description: register user
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/register'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/register'
 *              responses:
 *                      201:
 *                          description: Success
 *                      400:
 *                          description: Bad Request
 *                      401:
 *                          description: Unauthorization
 *                      500:
 *                          description: Internal Server Error
 *        
 */
router.post("/register",authController.register);



/**
 * 
 * @swagger
 *  /auth/checkOtp:
 *          post:
 *              summary: user getOtp with PhoneNumber
 *              tags: [User Authorization]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/checkOtp'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/checkOtp'       
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
router.post("/checkOtp",authController.checkOtp);

/**
 * 
 * @swagger
 *  /auth/login:
 *          post:
 *              summary: user login with phoneNumber and code
 *              tags: [User Authorization]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/login'
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/login'  
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
router.post("/login",authController.login);



module.exports = {
    authRoute : router,
}