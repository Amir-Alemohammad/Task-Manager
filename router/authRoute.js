const router = require("express").Router();

const authController = require("../controllers/authController.js");




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
 *              parameters:
 *              
 *              -   name: FullName
 *                  description: Your firstname and lastname
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: UserName
 *                  description: write you'r username
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: PhoneNumber
 *                  description: fa-IRI phone number
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: Email
 *                  description: your email address
 *                  required: true
 *                  in: formData
 *                  type: string
 *              -   name: Password
 *                  description: your password
 *                  required: true
 *                  in: formData
 *                  type: string
 *              -   name: ConfirmPassword
 *                  description: confirm password
 *                  required: true
 *                  in: formData
 *                  type: string
 *              -   name: Rols
 *                  description: you'r roles
 *                  in: formData
 *                  type: string
 *              -   name: Skills
 *                  description: you'r Skills
 *                  in: formData
 *                  type: string
 *              -   name: Teams
 *                  description: you'r Team
 *                  in: formData
 *                  type: string
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
 *              parameters:
 *              -   name: PhoneNumber
 *                  description: your phone number
 *                  required: true
 *                  in: formData
 *                  type : string
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
 *              parameters:
 *              -   name: PhoneNumber
 *                  description: your phone number
 *                  required: true
 *                  in: formData
 *                  type : string
 *              -   name: code
 *                  description: the code that was sent
 *                  required: true
 *                  in: formData
 *                  type : string
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