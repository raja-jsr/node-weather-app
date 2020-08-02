const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=617a96eee770914f93aa505291d7b4e1&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
       request( { url, json : true }, (error, {body}) => {
            if(error){
                callback('Unable to connect to weather service!', undefined);        
            } else if(body.error) {
                callback('Unable to find location!', undefined);
            } else {
                const curr = body.current
                const temp = curr.temperature
                const feelsLike = curr.feelslike
                const weather_desc = curr.weather_descriptions[0]
                const humidity = curr.humidity

                callback(undefined, weather_desc + '. It is currently '+ temp + ' degrees out. It is feels like ' + feelsLike + ' degrees out and the humidity is ' + humidity + '%.');
            }
    })
}

module.exports = forecast

