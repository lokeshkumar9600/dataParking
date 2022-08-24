const fetch = require("node-fetch");
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const parkingDataSchema = new mongoose.Schema({
  carpark_info: [{
    total_lots: {
      type: Number,
      required: true,
    },
    lot_type: {
      type: String,
      required: true,
    },
    lots_available: {
      type: Number,
      require: true,
    },
  }],
  carpark_number:{
    type: String,
    required: true,
  },
  update_datetime:{
     type: String,
     required: true,
  
  }
});

const liveparking = mongoose.model('liveparking',parkingDataSchema);
mongoose.connect(
  "mongodb+srv://lokisg565656:loki.sg565656@cluster0.is88otr.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", async function () {
  // const collection  = connection.db.collection("carparkdetails");
  // collection.find({}).toArray(function(err, data){
  //     console.log(data); // it will print your collection data
  // });
// app.get("/insertdata" ,  (req, res) => {
 
// });


  app.listen(3001 || process.env.port, (req, res) => {
    console.log("data is running");
    
    const get_data =  () => {
      var count = 0;
      fetch("  https://api.data.gov.sg/v1/transport/carpark-availability", {
        method: "GET",
        headers: {
          AccountKey: "lxo5rZTEQI2gJmBgPtnBYg==",
          CarParkID: "MP2M",
          access: "application/json",
        },
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we haven't got JSON!");
          }
          return response.json();
        })
        .then((data) => {
          data.items[0].carpark_data.forEach((item) => {
            
            // const livedetails =new liveparking({
            //    carpark_info:item.carpark_info,
            //    carpark_number:item.carpark_number,
            //    update_datetime:item.update_datetime,
            // });
            // var saved = livedetails.save();
            // if(!saved){
            //   console.log(err.message);
            // }else{
            //   count++
            // }
            count++;
  
            // liveparking.update({},{
            //   carpark_info:item.carpark_info,
            //    carpark_number:item.carpark_number,
            //    update_datetime:item.update_datetime,
            // },(err,save) => {
            //    console.log(save);
               
            // });
            // if(update_parking){
            //   console.log(update_parking)
            // }
  
             
          });
          console.log(count +  " data has arrived")
          //   collection.find({}).toArray(function(err, data){
          //     console.log(data); // it will print your collection data
          // });
        })
        .catch((error) => console.error(error));
    };
    get_data();
   setInterval(get_data,5000);
  });
});
