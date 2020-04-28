const express = require('express');
const csv = require("csvtojson");
const fs = require("fs");
const path = require('path');


const matchesPlayedPerYear = require('./datafile/matchesPlayedPerYear')
const matchesWonByEachTeam = require('./datafile/matchesWonByEachTeam')
const extraRunsConcededByEachTeam = require('./datafile/extraRunsConcededByEachTeam')
const tenEconomicalBowlers = require('./datafile/tenEconomicalBowlers')
const csvtojsonFile  = require('./datafile/csvtojsonFile')

const app = express();
const PORT = process.env.PORT || 2000

async function mainData(){
    const matches = await csvtojsonFile('matches.csv');
    const deliveries = await csvtojsonFile('deliveries.csv');
    fs.writeFile(path.join(__dirname,'./public/data.json'),JSON.stringify({
        matchesPlayedPerYear:matchesPlayedPerYear(matches),
        matchesWonByEachTeam:matchesWonByEachTeam(matches),
        extraRunsConcededByEachTeam:extraRunsConcededByEachTeam(deliveries,matches),
        tenEconomicalBowlers:tenEconomicalBowlers(deliveries,matches)
    }),'utf8',err=>{
        if(err){
            console.log(err)
        }
    })
}

mainData()


app.use(express.static(path.join(__dirname,'./public')))

app.listen(PORT,()=>console.log(`listning at ${PORT}`))