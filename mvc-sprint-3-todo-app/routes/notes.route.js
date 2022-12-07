const express = require("express")
const { noteModel } = require("../Models/Note.model")

const noteRouter = express.Router();

const Validator = (req, res, next) => {
    if (req.method == "POST") {
        const payload = req.body;
        if (payload.item) {
            if ((typeof payload.item === "string")) {
                next()
            }
            else {
                res.send({ "error": "Please entre right validation failed" })
            }
        }
        else {
            res.send({ "error": " Please select right method Failed" })
        }
    }
    else {
        next()
    }
}

noteRouter.get("/", async (req, res) => {
    const params = req.query
    try {
        const notes = await noteModel.find(params)
        res.send(notes)
    }
    catch (err) {
        console.log(err)
        res.send({ "error": "something went wrong" })
    }

})
noteRouter.use(Validator);
noteRouter.post("/createuser", async (req, res) => {
    try {
        const payload = req.body
        const note = new noteModel(payload)
        await note.save()
        res.status(200).json("Todo Item created successfully")
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ "error": "something went wrong" })
    }
})

noteRouter.patch("/edit/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const payload = req.body;
    try {
        const query = await noteModel.findByIdAndUpdate({ _id: noteID }, payload)
        console.log(query)
        res.status(200).json("Todo Updated Successfully")
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ "error": "something went wrong, try again later" })
    }
})


noteRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        await noteModel.findByIdAndDelete({ _id: noteID })
        res.status(200).json(`Note ${noteID} deleted successfully`)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ "error": "something went wrong, try again later" })
    }
})

module.exports = { noteRouter }
