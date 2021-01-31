import express from "express"
import * as model from "./models/interface";
import repository from "./repository"


var router = express.Router(); ////  /api/audio/

/*
* read repository.getAjats method description
*/
router.get("/", async (req, res) => {
    var result = await repository.getAjats(arr => {
        res.json(arr)
    })
})

/*
* read repository.getAjatsOfSura method description
*/
router.get("/BySura", async (req, res) => {
    let suraId = req.query.Id?.toString() as string
    var result = await repository.getAjatsOfSura(suraId, arr => {
        res.json(arr)
    })
})

/*
* read repository.getBy method description
*/
router.get("/getBy", async (req, res) => {
    let params = req.query as unknown as model.IGetCurrTrekReq
    var result = await repository.getBy(params)
    res.json(result)
})

/*
 * read repository.getCurrentAjatOfSura method description
 */
router.get("/getCurr", async (req, res) => {
    let params = req.query as unknown as model.IGetCurrTrekReq
    await repository.getCurrentAjatOfSura(params, obj => {
        res.json(obj)
    })
})

/*
* read repository.getAjatsFromCurrentPosition method description
*/
import {Request} from "express"
type reqType <T> = Request<any, any, any, T>
router.get("/getFrom", async (req : reqType<{index: number, suraIndex: string}>, res) => {
    let params = req.query as model.IGetFromCurrTrekReq
    await repository.getAjatsFromCurrentPosition(params, obj => {
        res.json(obj)
    })
})

/*
* read repository.getAjatsRange method description
*/
router.get("/getRange", async (req, res) => {
    let params = req.query as unknown as model.IGetTrekRangeReq
    await repository.getAjatsRange(params, obj => {
        res.json(obj)
    })
})

/*
* read repository.getPaginated method description
*/
router.get("/getPaginated", async (req, res) => {
    let params = req.query as unknown as model.IGetTrekPaginated
    await repository.getPaginated(params, obj => {
        res.json(obj)
    })
})

export default router



type req = {

}