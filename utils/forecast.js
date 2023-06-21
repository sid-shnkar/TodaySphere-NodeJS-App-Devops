const request=require('request');

const forecast=(latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=' + encodeURIComponent(process.env.WEATHERSTACK_ACCESS_KEY) + '&query=' +encodeURIComponent(longitude) +',' + encodeURIComponent(latitude)+'&units=f' ;
    request({url, json:true}, (error, {body}={}) => {
        if(error){
      callback("Unable to connect to weather service", undefined)
        }else if(body.error){
       callback("Unable to fetch location", undefined)
        }else{
        callback(undefined, {
            description:body.current.weather_descriptions[0],
            temperature:body.current.temperature,
            feelslike:body.current.feelslike,
            humidity:body.current.humidity
            //response.body.current.weather_descriptions[0] + " .It is currently " + response.body.current.temperature + " degrees outside. But it feels like " +  response.body.current.feelslike + " degrees." 
        }
        )
        }
    })

}

module.exports=forecast;