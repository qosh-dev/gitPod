import express from "express"

var router = express.Router();




router.get("/", (req, res) => {
    console.log("birs pages");
    
    res.json("welcome to user support service")
})






export default router