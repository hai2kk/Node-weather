const request = require("postman-request");

const getWeather = (latitude, longitude, callback) => {
  let weatherUrl =
    "http://api.weatherstack.com/current?access_key=fbdcad3eb95d68d031c5ddb1608020e0&query=";
  weatherUrl = weatherUrl + latitude + "," + longitude;
  console.log(weatherUrl);
  request({ url: weatherUrl, json: true }, (err, response) => {
    if (err) {
      console.log(
        "Unable to connect to weather service. Please try again later"
      );

      callback("Unable to connect to weather service.", undefined);
    } else {
      const { region } = response.body.location;
      const {
        temperature,
        feelslike,
        weather_descriptions,
      } = response.body.current;
      console.log(
        `The current temperatue of ${region} is ${temperature} and is ${weather_descriptions[0]}. But it feels like ${feelslike}`
      );

      callback(undefined, {
        region: region,
        temperatue: temperature,
        description: weather_descriptions[0],
        feelslike: feelslike,
      });
    }
  });
};

module.exports = getWeather;
