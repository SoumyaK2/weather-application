const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
const port= 80;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const city= req.body.cityName;
    const URL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=[Your_App_ID]&units=metric"

    https.get(URL,(response)=>{
        response.on("data",(data)=>{
            const weatherData= JSON.parse(data);

            const temp= weatherData.main.temp, weatherDescription= weatherData.weather[0].description, icon= weatherData.weather[0].icon, geoCoordsLon=weatherData.coord.lon, geoCoordsLat=weatherData.coord.lat, humidity= weatherData.main.humidity, windSpeed= weatherData.wind.speed, clouds= weatherData.clouds.all;          
            
            
            const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"   
            

            res.write(`<div 
            style="min-height: 100vh;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            background-image: url(https://images.pexels.com/photos/133953/pexels-photo-133953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
            background-size: cover;
            background-repeat: no-repeat;
            color: #0C134F;
            font-size: 2rem;  
            text-shadow: 1px 1px white;">
                        <div>
                        <h1>${city} -- Teamprature ${temp} <span>&#8451;</span> </h1>                        
                        <h3>Geo Coords [${geoCoordsLat} , ${geoCoordsLon}] </h3>
                        <h3>Weather -- ${weatherDescription} </h3>
                        <h3>Humidity -- ${humidity} </h3>
                        <h3>Wind Speed -- ${windSpeed} m/s </h3>
                        <h3>Clouds -- ${clouds} </h3>
                        <img src=${imageURL}>
                        </div> 
                        </div> `);
            

            res.send()
        })
    })
    
});

app.listen(port,()=>{
    console.log("Your server is runing at port "+port);
});

