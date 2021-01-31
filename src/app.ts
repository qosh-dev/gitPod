import express, { Request, Response } from "express"
import  bodyParser from "body-parser";

const config = {
    PORT : 5000,
    audioRoute : "/api/audio/",
    audioFilesPath : `http://localhost:5000/api/audio/`
}
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))


app.get("/", (req, res) => {
    // res.json("test")
    res.redirect("/ddd")
})

app.get("/ddd", (req, res) => {
    res.json("asdasdasd")
})




app.listen(config.PORT , () => {

    console.log(`Listen on  : http://localhost:${config.PORT}`);
    
})




export default config