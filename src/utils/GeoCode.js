const request = require("postman-request");

const getGeoCode = (place, callback) => {
  place = encodeURI(place);
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiaGFpMmtrNGNvZGUiLCJhIjoiY2tjamttbTU5MTFpbDMxcWlyc3l5ejQycyJ9.0ekYxqA-a3prpLUOSY3h5A`;
  request({ url: geoCodeUrl, json: true }, (err, response) => {
    if (err) {
      console.log(
        "Unable to connect to location service. Please try again later"
      );
      callback("Unable to connect to location service.", undefined);
    } else if (response.body.error) {
      callback("Error connecting to location service.", undefined);
    } else {
      console.log(response.body);
      if (response.body.features && response.body.features.length > 0) {
        const [longitude, latitude] = response.body.features[0].geometry.coordinates;
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          location: place,
        });
      } else {
        callback("Error connecting to location service.", undefined);
      }
    }
  });
};

module.exports = getGeoCode;
