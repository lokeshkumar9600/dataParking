const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const parkingSchema = new mongoose.Schema({
  carParkNumber: { type: String, required: true },
  address: { type: String, required: true },
  xCoord: { type: String, required: true },
  yCoord: { type: String, required: true },
  carParkType: { type: String, required: true},
  typeOfParkingSystem: { type: String, required: true },
  ShortTermParking: { type: String, required: true },
  freeParking: { type: String, required: true },
  nightParking: { type: String, required: true },
  carParkDecks: { type: String, required: true },
  gantryHeight: { type: String, required: true },
  carParkBasements: { type: String, required: true },
});

const carparkDetails = mongoose.model('CarparkDetails',parkingSchema);

mongoose
  .connect(
    "mongodb+srv://lokisg565656:loki.sg565656@cluster0.is88otr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((connection) => {
    console.log("connection successsful");
    app.listen(4000, (req, res) => {
      console.log("server is running");
    });
  });
// var x  =   db.getCollection("carparkdetails");
// console.log(x);

app.get("/carpark-all", async (req, res) => {
  console.log("route reached");
  var details = await carparkDetails.find({});
  if (!details) {
    res.status(400).json({ error: "data not found" });
  } else {
    res.status(200).json({ data: details });
  }
});

app.get("/update", async (req, res) => {
  console.log("route reached");
  const det = await carparkDetails.update({}, { $rename: { address: "name" } });
  if (det) {
    console.log(det);
  }
});

// app.get("/datacheck",(req,res) => {

// })

// var firstProjection = '+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';
// var secondProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
// //I'm not going to redefine those two in latter examples.
// console.log(proj4(firstProjection,secondProjection,[33758.4143,33695.5198]));
