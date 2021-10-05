const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

var favPlayers = [];

const map = require('../country').returnMap();

//this will help us connect to the database
const dbo = require("../db/conn");

//Create a new record
recordRoutes.route("/record/add").post((req,response) => {
    let db = dbo.getDb();
    let myobj = req.body;
    console.log("Need to post");
    let collection = db.collection("records");
    collection.updateOne({id:myobj.id},{$set:{myobj}},{upsert:true})
    response.send("Good");
    // db_connect.collection("records").insertOne(myobj, (err,res) => {
    //     if(err) throw err;
    //     response.json(res);
    // });
});


recordRoutes.route("/record/remove").get((req,res) => {
    console.log("here");
    favPlayers = favPlayers.filter((item) => item.id != req.query.id) 
    res.send(favPlayers);
})


recordRoutes.route("/record/get").get((req,response) => {
    // const player = req.body;
    response.send(favPlayers)
    // favPlayers.push(player);
    // response.send("Player Data recieved");
    // console.log(player);

})



recordRoutes.route("/record/save").post((req,response) => {
    const player = req.body;
    favPlayers.push(player);
    response.send("Player Data recieved");
    console.log(player);

})

//return Country code
recordRoutes.route("/code").get((req,res) => {
    console.log(req.query);
    let code = map.get(req.query.country);
    console.log(code);
    res.send(code);
})


module.exports = recordRoutes;
