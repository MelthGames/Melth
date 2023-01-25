const { LolApi, Constants } = require("twisted")

const regions = {
    br: Constants.Regions.BRAZIL,
    eun: Constants.Regions.EU_EAST,
    euw: Constants.Regions.EU_WEST,
    kr: Constants.Regions.KOREA,
    lan: Constants.Regions.LAT_NORTH,
    las: Constants.Regions.LAT_SOUTH,
    na: Constants.Regions.AMERICA_NORTH,
    oc: Constants.Regions.OCEANIA,
    tr: Constants.Regions.TURKEY,
    ru: Constants.Regions.RUSSIA,
    jp: Constants.Regions.JAPAN,
    pbe: Constants.Regions.PBE,
}

const ranks = {
    CHALLENGER: 'RETADOR',
    GRANDMASTER: 'GRAN MAESTRO',
    MASTER: 'MAESTRO',
    DIAMOND: 'DIAMANTE',
    PLATINUM: 'PLATINO',
    GOLD: 'ORO',
    SILVER: 'PLATA',
    BRONZE: 'BRONCE',
    IRON: 'HIERRO'
}

const LolClient = () => {
    return new LolApi({
        rateLimitRetry: true, //If api response is 429 (rate limits) try reattempt after needed time (default true)
        rateLimitRetryAttempts: 1, //Number of time to retry after rate limit response (default 1)
        concurrency: undefined, //Concurrency calls to riot (default infinity) Concurrency per method (example: summoner api, match api, etc)
        key: 'RGAPI-2b29069b-3591-4446-bdff-a01b910c6ee5',//Riot games api key
        debug: {//Debug methods
            logTime: false,//Log methods execution time (default false)
            logUrls: false,//Log urls (default false)
            logRatelimit: false//Log when is waiting for rate limits (default false)
        }
    })
}

const rankImage = {
    IRON: "./src/assets/images/Emblem_Iron.png",
    BRONZE: "./src/assets/images/Emblem_Bronze.png",
    SILVER: "./src/assets/images/Emblem_Silver.png",
    GOLD: "./src/assets/images/Emblem_Gold.png",
    PLATINUM: "./src/assets/images/Emblem_Platinum.png",
    DIAMOND: "./src/assets/images/Emblem_Diamond.png",
    MASTER: "./src/assets/images/Emblem_Master.png",
    GRANDMASTER: "./src/assets/images/Emblem_Grandmaster.png",
    CHALLENGER: "./src/assets/images/Emblem_Challenger.png",
    UNRANKED: "./src/assets/images/Emblem_Unranked.png"
}

const rankColors = {
    IRON: "#A9A9A9",
    BRONZE: "#8A5B11",
    SILVER: "#C0C0C0",
    GOLD: "#FFD700",
    PLATINUM: "#00BFFF",
    DIAMOND: "#00FFFF",
    MASTER: "#FF00FF",
    GRANDMASTER: "#FF0000",
    CHALLENGER: "#FBC46D",
    UNRANKED: "#525252"
}

module.exports = {
    LolClient,
    regions,
    ranks,
    rankImage,
    rankColors
}