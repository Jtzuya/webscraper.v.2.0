const puppeteer = require('puppeteer');

async function scrapeChannel(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // Grabbing xpaths
    // const nameXPath = '/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string'
    // const imageXPath = '/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/yt-img-shadow/img'
    
    // Desctructuring [variableName] in this case the [el] & [el2] ~ will pull out the first item in the array
    const [el] =  await page.$x('/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string')
    const text = await el.getProperty('textContent')
    const name = await text.jsonValue()

    const [el2] = await page.$x('/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/yt-img-shadow/img')
    const img = await el2.getProperty('src')
    const avatarURL = await img.jsonValue()

    browser.close()
    console.log({name, avatarURL})
    return { name, avatarURL }
}

// Temporarily call the function while testing with random channel name as an argument
// scrapeChannel('https://www.youtube.com/c/AaronJackFreemote')

/* 
----------------------------------------------------------------------------
    Now after testing and everything works, we then export the 
    scrapeChannel function and import to our API (in this case the) 
    index.js file
----------------------------------------------------------------------------
*/
module.exports = {
    scrapeChannel
}