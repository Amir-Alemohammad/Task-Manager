const express = require("express");
const dotenv = require("dotenv");
const path = require('path');

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



//Routes
app.use(AllRoutes);


//Error Handler
app.use(errorController.get404);
app.use(errorHandler);




app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
})