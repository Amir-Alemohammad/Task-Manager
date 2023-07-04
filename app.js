const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const connectDB = require("./config/dataBase.js");
const errorController = require("./controllers/errorController.js");
const {AllRoutes} = require("./router/router.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
const { setHeaders } = require("./middlewares/handleHeaders.js");

const app = express();

//Config DotEnv
dotenv.config();



//DataBase Connection
connectDB();





//ParsBody
app.use(setHeaders);
app.use(express.urlencoded({extended:false}));
app.use(express.json());





//Static Folder
app.use(express.static(path.join(__dirname,"public")));


//Swagger Ui
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerJsDoc({
    definition : {
        info : {
            title : "Task-Manager",
            version : "2.0.0",
            description : "سایتی برای مدیریت برنامه ها",
            contact: {
                name: "Amir-Alemohammad",
                email: "amirho3inalemohammad@gmail.com",
            }
        },
        servers:[
            {
                url : "http://127.0.0.1:3000"
            },
        ],
        
    },
    apis: ["./router/*.js"],

})));


//Routes
app.use(AllRoutes);


//Error Handler
app.use(errorController.get404);
app.use(errorHandler);




app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
})