import express, { Request, Response } from "express"
import audioFilesService from "./service/audioFiles/controller";
import userSupportService from "./service/userSupport/controller";
import  bodyParser from "body-parser";

const config = {
    PORT : 5000,
    audioRoute : "/api/audio/",
    audioFilesPath : `http://localhost:5000/api/audio/`
}
const app = express()

//Body parser configure
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

// Adding folder with audio files 

app.use(config.audioRoute, express.static('./mp3'));

//#region audioFilesEndPoint  /api/audio/

app.use(config.audioRoute, audioFilesService )




//#endregion

type req<T> = Request<any, any, any, T>
//#region userSupportEndPoint  /api/userSupport/

app.use("/api/userSupport/", userSupportService)

//#endregion





app.listen(config.PORT , () => {

    console.log(`Listen on  : http://localhost:${config.PORT}`);
    
})




  export default config