const express = require("express");
const colors = require("colors");
const morgan= require("morgan");   //http request log krne k liye middleware
const dotenv = require("dotenv");  //.env file se envirnemnt variables ko  access krne k liye...
const mySqlPool = require("./config/db"); //MySQL database connection

//config dotenv
dotenv.config();
//rest object
const app = express()

//middlwares
app.use(express.json());
app.use(morgan("dev "));

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));


app.get("/test", (req,res)=>{
    res.status(200).send("<h1>Welcome</h1>")
})
//port
const PORT = process.env.PORT  || 8080;;


//conditionaly Listen
mySqlPool.query("SELECT 1").then(()=>{
    //MY SQL
    console.log("MySQL DB Connected".bgCyan.white)
    //listen
app.listen(PORT,()=>{
    console.log(`Server is running  on port ${process.env.PORT}`.bgMagenta.white);
})
})
.catch((error)=>{
    console.log(error);
})


