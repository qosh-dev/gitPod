
import fs from "fs"
import config from "../../app";
import * as model from "./models/interface";



/**
 * getAjatsOfSura
 */
class repository {

    /** 
    *
    * Get specified audio file (ajat)
    *
    * @param suraIndex : string
    * @param ajatIndex : string
    * 
    * @example http://localhost:5000/api/audio/getBy?suraIndex=2&ajatIndex=2
    */
    static getBy(params: model.IGetCurrTrekReq) {
        var param = getAjatSura(params)
        return `${config.audioFilesPath}${param.sura}${param.ajat}.mp3`
    }

    /**
    * Get all audioFiles(ajats) of specified sura(@param Id)
    * 
    * @param Id  unique identifier of sura
    * 
    * @callback Array<String> to get data
    */
    static async getAjatsOfSura(Id : string,callback : (arr: Array<String>) => void) {
        let sura = getSura(Id)
        await fs.readdir(`./mp3/`, (err, tempArr) => {
            var temp: Array<string> = []
            tempArr.forEach(el => {
                if (el.startsWith(sura) && el.endsWith(".mp3")) {
                    temp.push(el)
                }
            });
            callback(temp)
        })
    }

    /**
    * Get all audioFiles(ajats)
    * 
    * @callback Array<String> to get data
    */
    static async getAjats(callback: (arr: Array<String>) => void) {
        await fs.readdir(`./mp3/`, (err, tempFiles) => {
            var tempArr = tempFiles.filter(el => el.endsWith(".mp3"))
            callback(tempArr.map(e => `${config.audioFilesPath}${e}`))
            }
        );
    }

    /** 
    *
    * Get all audioFile(ajats) of sura with current audioTrek
    *
    * @param suraIndex : string
    * @param ajatIndex : string
    * 
    * @example http://localhost:5000/api/audio/getCurr?suraIndex=2&ajatIndex=100
    * 
    * @callback {currTrek : string, currTrekIndex : number, trekArr : Array<string>}
    */
    static async getCurrentAjatOfSura(params: model.IGetCurrTrekReq, callback: (obj: model.IGetCurrTrekRes) => void) {
        var param = getAjatSura(params)
        await fs.readdir(`./mp3/`, (err, tempArr) => {
            var fileArr: Array<string> = []
            tempArr.forEach(el => {
                if (el.startsWith(param.sura) && el.endsWith(".mp3")) {
                    fileArr.push(el)
                }
            });
            var result: model.IGetCurrTrekRes = {
                currTrek: `${config.audioFilesPath}${param.sura}${param.ajat}.mp3`,
                currTrekIndex: 0,
                trekArr: []
            }
            console.log(param);

            for (let i = 0; i < fileArr.length; i++) {
                var temp = `${config.audioFilesPath}${fileArr[i]}`
                result.trekArr.push(temp)
                if (temp.endsWith(`${param.ajat}.mp3`)) {
                    result.currTrekIndex = i
                }
            }
            callback(result)
        }
        );
    }

    /** 
    *
    * Get all audioFile(ajats) of sura from specified ajat(@param index / Not inclusive)
    *
    * @param suraIndex : string
    * @param index : number
    * 
    * @example http://localhost:5000/api/audio/getFrom?suraIndex=2&index=10
    * 
    * @callback  Array<String>
    */
    static async getAjatsFromCurrentPosition(params: model.IGetFromCurrTrekReq, callback: (arr: Array<String>) => void) {
        var sura = getSura(params.suraIndex)
        await fs.readdir(`./mp3/`, (err, tempArr) => {
            var temp: Array<string> = []
            tempArr.forEach(el => {
                if (el.startsWith(sura) && el.endsWith(".mp3")) {
                    temp.push(el)
                }
            });
            let resultArr: Array<string> = []
            for (let i = params.index; i < temp.length; i++) {
                resultArr.push(`${config.audioFilesPath}${temp[i]}`)
            }
            callback(resultArr)
        })
    }


    /** 
    *
    * Get all audioFile(ajats) of sura from specified ajat(@param from / Not inclusive) to (@param to)
    *
    * @param suraIndex : string
    * @param from : number
    * @param to : number
    * 
    * @example http://localhost:5000/api/audio/getRange?suraIndex=2&from=10&to=15
    * 
    * @callback  Array<String>
    */
    static async getAjatsRange(params: model.IGetTrekRangeReq, callback: (arr: Array<String>) => void) {
        var sura = getSura(params.suraIndex)

        await fs.readdir(`./mp3/`, (err, tempArr) => {
            var temp: Array<string> = []
            tempArr.forEach(el => {
                if (el.startsWith(sura) && el.endsWith(".mp3")) {
                    temp.push(el)
                }
            });
            let resultArr: Array<string> = []
            for (let i = params.from; i < params.to; i++) {
                resultArr.push(`${config.audioFilesPath}${temp[i]}`)
            }

            callback(resultArr)
        })
    }

    /** 
   *
   * Get all audioFile(ajats) of spefied page
   *
   * @param suraIndex : string
   * @param count : number / number of elements in page
   * @param page : number
   * 
   * @example http://localhost:5000/api/audio/getPaginated?suraIndex=2&page=96&count=3
   * 
   * @callback  Array<String>
   */
    static async getPaginated(params: model.IGetTrekPaginated, callback: (arr: Array<String>) => void) {
        var sura = getSura(params.suraIndex)

        await fs.readdir(`./mp3/`, (err, tempArr) => {
            var temp: Array<string> = []
            tempArr.forEach(el => {
                if (el.startsWith(sura) && el.endsWith(".mp3")) {
                    temp.push(el)
                }
            });
            callback(temp.paginate(params.count, params.page))
        })
    }

}
export default repository




//#region Methods

function getSura(suraIndex: string) {
    let resultSura = ""
    switch (suraIndex.length) {
        case 1:
            resultSura = `00${suraIndex}`
            break
        case 2:
            resultSura = `0${suraIndex}`
            break
        default:
            resultSura = suraIndex
    }
    return resultSura
}

function getAjatSura(params: model.IGetCurrTrekReq): ajatSura {
    let resultAjat = ""
    let resultSura = ""
    switch (params.ajatIndex.length) {
        case 1:
            resultAjat = `00${params.ajatIndex}`
            break
        case 2:
            resultAjat = `0${params.ajatIndex}`
            break
        default:
            resultAjat = params.ajatIndex
    }
    switch (params.suraIndex.length) {
        case 1:
            resultSura = `00${params.suraIndex}`
            break
        case 2:
            resultSura = `0${params.suraIndex}`
            break
        default:
            resultSura = params.suraIndex
    }
    return { ajat: resultAjat, sura: resultSura }
}

type ajatSura = { ajat: string, sura: string }

declare global {
    interface Array<T> {
        paginate(count: number, page: number): Array<T>
        pages(count: number): number
    }
}

Array.prototype.paginate = function <T>(this: T[], count: number, page: number) {
    var list: Array<T> = new Array<T>();
    page = (page - 1) * count;
    count = Number(page) + Number(count);
    if (this.length > count) {
        for (let i = page; i < count; i++) {
            list.push(this[i]);
        }
    } else {
        for (let i = page; i < this.length; i++) {
            list.push(this[i])
        }
    }
    return list;
}

Array.prototype.pages = function <T>(this: T[], count: number) {
    count = this.length / count
    let temp = count.toString().split(".")
    return temp.length != 1 ? Number(temp[0]) + 1 : count
}

//#endregion