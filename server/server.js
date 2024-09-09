 // imports for the server 
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const ConnectDB = require("./config/DB");

//cors is a middleware used as a bridge for connection between server and client 
const corOptions = {
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true
};
   // middlewares
   app.use(express.json());
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(cors(corOptions))

//    routes
app.use("/api/useraccount",require("./routers/userAccountRoute"));
app.use("/api/useraccount/login",require("./routers/loginRoute"));
app.use("/api/floor",require("./routers/floorRoute"))
app.use("/api/hall",require("./routers/hallRoute"))
app.use("/api/event",require("./routers/eventRoute"))

// Server Listening
const PORT = process.env.Port || 6000;
ConnectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is successfully running on http://localhost:${PORT}/`)
    })    
}) 