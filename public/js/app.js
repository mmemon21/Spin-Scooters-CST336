
function searchSeasideWeather() 
{
    //var key = "8384927b5ea8ff2b094b128d3d69b493";
    $.ajax({
      method: "GET",
                //url://"https://api.openweathermap.org/data/2.5/weather?&appid=" + key, 
                //api.openweathermap.org/data/2.5/weather?zip=94040,us
                //api.openweathermap.org/data/2.5/weather?zip=94515,us&appid= + "appid"
                url:"https://api.openweathermap.org/data/2.5/weather?zip=93955,us&appid",//"https://api.openweathermap.org/data/2.5/weather?&appid=8384927b5ea8ff2b094b128d3d69b493",
                dataType: "json",
                data: {
                //"q": name+","+state,//93933
                "zip": $("#zip").val(),
                "appid": "8384927b5ea8ff2b094b128d3d69b493"
                },
                success: function (result, status) {
                    console.log(result);
                    
                    $("#result1").html("The weather in "+"Seaside"+" is : " +result["weather"][0]["main"]);
                    $("#result3").html("The weather description is : " +result["weather"][0]["description"]);
                    
                    document.getElementById("result1").style.backgroundColor = "#F0FFFF";
                    document.getElementById("result2").style.backgroundColor = "#F0FFFF";
                    document.getElementById("result3").style.backgroundColor = "#F0FFFF";
                
                    if(result["weather"][0]["icon"] == "01d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/01d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "01n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/01n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "02d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/02d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "02n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/02n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "03d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/03d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "03n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/03n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "04d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/04d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "04n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/04n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "09d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/09d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "09n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/09n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "10d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/10d@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "10n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/10n@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "11d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/11d@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "11n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/11n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "13d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/13d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "13n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/13n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "50d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/50d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "50n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/50n@2x.png>");
                    }
                    
                }
            });

}

//////////////////////////////////////////////////

function searchMarinaWeather() 
{
 
    $.ajax({
      method: "GET",
                url:"https://api.openweathermap.org/data/2.5/weather?zip=93933,us&appid",
                dataType: "json",
                data: {
                "zip": $("#zip").val(),
                "appid": "8384927b5ea8ff2b094b128d3d69b493"
                },
                success: function (result, status) {
                    console.log(result);
                    
                    $("#result1").html("The weather in "+"Marina"+" is : " +result["weather"][0]["main"]);
                    $("#result3").html("The weather description is : " +result["weather"][0]["description"]);
                    
                    document.getElementById("result1").style.backgroundColor = "#F0FFFF";
                    document.getElementById("result2").style.backgroundColor = "#F0FFFF";
                    document.getElementById("result3").style.backgroundColor = "#F0FFFF";
                
                    if(result["weather"][0]["icon"] == "01d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/01d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "01n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/01n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "02d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/02d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "02n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/02n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "03d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/03d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "03n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/03n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "04d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/04d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "04n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/04n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "09d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/09d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "09n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/09n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "10d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/10d@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "10n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/10n@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "11d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/11d@2x.png>");
                    }
                    
                     if(result["weather"][0]["icon"] == "11n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/11n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "13d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/13d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "13n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/13n@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "50d")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/50d@2x.png>");
                    }
                    
                    if(result["weather"][0]["icon"] == "50n")
                    {
                    $('#result2').html("<img src=http://openweathermap.org/img/wn/50n@2x.png>");
                    }
                    
                }
            });

}

