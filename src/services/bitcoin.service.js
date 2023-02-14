'use strict'

import axios from 'axios'
import { dbService } from './db.service.js'

const RATE_KEY = 'rate'
const MARKET_HISTORY_KEY = 'market'
const AVG_KEY = 'avg'

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate() {
    var rate = await dbService.query(RATE_KEY)
    // console.log("getRate - from storage");
    if (!rate || !rate.length) {
        try {
            rate = []
            const rateToAdd = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
            rate.unshift(rateToAdd)
            await dbService.insert(RATE_KEY, rate)
            // console.log("getRate - from api", rate[0].data);
        }
        catch (err) {
            console.log(err, err.massage);
        }
    }
    console.log('Rate:', '1$ = ', rate[0].data, 'BTC')
    return rate[0].data
}

async function getMarketPriceHistory() {
    var marketPriceHistory = await dbService.query(MARKET_HISTORY_KEY)
    // console.log("getRate - from storage");
    if (!marketPriceHistory || !marketPriceHistory.length) {
        try {
            const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            marketPriceHistory = res.data.values
            // console.log("getMarketPriceHistory() from api", marketPriceHistory)
            await dbService.insert(MARKET_HISTORY_KEY, marketPriceHistory)
        }
        catch (err) {
            console.log(err, err.massage);
        }
    }
    console.log("MarketPriceHistory:", marketPriceHistory)
    return marketPriceHistory
}


async function getAvgBlockSize() {
    var avgBlockSize = await dbService.query(AVG_KEY)
    // console.log("avgBlockSize - from storage");
    if (!avgBlockSize || !avgBlockSize.length) {
        try {
            const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            avgBlockSize = res.data.values
            // console.log("getAvgBlockSize from api", avgBlockSize);
            await dbService.insert(AVG_KEY, avgBlockSize)
        }
        catch (err) {
            console.log(err, err.massage);
        }
    }
    console.log("AvgBlockSize:", avgBlockSize);
    return avgBlockSize
}