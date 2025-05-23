const express = require("express"); //server banane ke liye use hota hai.
const colors = require("colors"); //Console mein colorful logs dikhane ke liye
const morgan= require("morgan");   //http request log krne k liye middleware
const dotenv = require("dotenv");  //.env file se envirnemnt variables ko  access krne k liye...
const mySqlPool = require("./config/db"); //MySQL database connection  nd MySQL database connection ka object, jisse database se baat karte hain.

//config dotenv
dotenv.config();    //.config() function ko call karne se .env file ke andar ke variables ko process.env object mein load kar leta hai.
//rest object
const app = express() //object create kiya jata hai jo express application ko represent karta hai.

//middlwares
app.use(express.json());   //json data ko convert karke javascript object mein badal deta hai, taki hum us data ke sath kaam kar sakein.
app.use(morgan("dev "));    //Ye har incoming HTTP request ka log (record) console me print karta hai.  nd Development ke time, ye helpful hota hai pata lagane ke liye ki kaunsi request kab aayi, method kya tha (GET, POST), response ka status code kya tha, response time kitna tha, etc

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));


app.get("/test", (req,res)=>{
    res.status(200).send("<h1>Welcome</h1>")
})
//port
const PORT = process.env.PORT  || 8080;;


//conditionaly Listen
mySqlPool.query("SELECT 1").then(()=>{     //Jab tak database se connection successful na ho, tab tak server ko start mat karo nd "Kya database se connection sahi se ho raha hai?"
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


