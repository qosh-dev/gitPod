
export interface IGetCurrTrekRes {
    currTrek: string
    currTrekIndex: number
    trekArr: Array<string>
}


export interface IGetCurrTrekReq {
    suraIndex: string
    ajatIndex: string
}

export interface IGetFromCurrTrekReq {
    index: number
    suraIndex: string
}
export interface IGetTrekRangeReq {
    from: number
    to: number
    suraIndex: string
}

export interface IGetTrekPaginated {
    page: number
    count: number
    suraIndex: string
}
