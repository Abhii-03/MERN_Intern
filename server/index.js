const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 4000

// cookie parser - 
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));

require("./config/dataBase").connect()

const user = require("./routes/user.js")
const employee = require("./routes/employee.js")

// mount
app.use("/api/v1/user", user)
app.use("/api/v1/employee", employee)




// ----------------------------deployment--------------------------------------

// const __dirname = path.resolve();
// console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(("./frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./frontend", "build", "index.html"));
    });

} else {
    app.get('/', (req, res) => {
        res.send("Welcome to Test Intern API's ")
    })
}
// ----------------------------deployment--------------------------------------

// activate server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// default browser
// app.get("/", () =>{
//     res.send("Welcome to my API")
// })