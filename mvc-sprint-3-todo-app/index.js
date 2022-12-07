const express = require("express")

const { connection } = require("./config/db")
const { noteRouter } = require("./routes/notes.route")

const cors = require("cors");

require('dotenv').config()
const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use("/notes", noteRouter)



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB Successfully")

    }
    catch (err) {
        console.log("Connection to DB failed")
        console.log(err)
    }
    console.log(`Listening on port ${process.env.port}`)
})


