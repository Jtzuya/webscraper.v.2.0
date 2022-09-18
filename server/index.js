const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// Import Scraper
const scraper = require('./scraper');

// Import db
const db = require('./db');

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // Disable for security reasons
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.get('/creators', async (req, res) => {
    
    // Delete mock data but in this case just commenting it out for guide purposes
    // const creators = [
    //     {
    //         name: 'Code Drip',
    //         img: 'https://'
    //     },
    //     {
    //         name: 'Dave Lee',
    //         img: 'https://'
    //     },
    //     {
    //         name: 'Dave Cus',
    //         img: 'https://'
    //     }
    // ]

    // Put our function from the db
    const creators = await db.getAllCreators()

    // todo GET from Database
    res.send(creators)
})

app.post('/creators', async (req, res) => {
    console.log(req.body)
    const channelData = await scraper.scrapeChannel(req.body.channelValue)

    // todo Scrape channel
    // todo Add to Database
    const creators = await db.insertCreator(channelData.name, channelData.avatarURL, req.body.channelValue)
    res.send(creators)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// curl http://localhost:3000/creators