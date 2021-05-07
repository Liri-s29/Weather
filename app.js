const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",(req, res)=>{

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", (req, res)=>{
    const city = req.body.cityName;
    const apiKey = "19d785ed9903585c0c1c405d5edd6eb2";
    let unit = req.body.unit;
    let unitName;
    switch(unit){
        case "metric":
            unitName = "Celcius";
            break;
        case "imperial":
            unitName = "Fahrenheit";
            break;
        default:
            unitName= "Kelvin";
    }
    console.log(unit);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",%20IN&appid="+apiKey+"&units="+unit;

    https.get(url, (response)=>{
                console.log(response.statusCode);
        
                response.on("data", (data)=>{
                   
                    const weatherData =  JSON.parse(data);
                    
                    const temp = weatherData.main.temp;
                    const weatherDescription = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const server = "window.location.href='/'";
                    res.write("<div><h2>"+ city +"</h2>");
                    res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
                    res.write("<h3>Temperature : "+temp+" Degrees "+ unitName + " </h3>");
                    res.write("<h3> Weather Description : "+weatherDescription+"</h3>");
                    res.write("<button onclick="+server+">New Location</button></div>");
                    res.send();
                });
            });
});
    

app.listen(process.env.PORT || 3000,() =>{
    console.log("Server is running on port 3000");
});

