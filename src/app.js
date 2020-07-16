const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getGeoCode = require("./utils/GeoCode");
const getWeather = require("./utils/Weather");

const app = express();

//Define paths for express configs
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(viewsPath);

//Setup handlebar engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  let weatherObj = {};
  getGeoCode(req.query.address, (error, { latitude, longitude }={}) => {
    console.log(latitude + " -- " + longitude);
   
    if (error) {
      return res.send({ forecast: error });
    }

    getWeather(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({ forecast: error });
      }
      foreCastData.address= req.query.address;
      return res.send({ forecast: foreCastData });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send('{"products": []}');
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Weather",
    headerTitle: "Weather",
    author: "Created by Krishna",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    label: "About",
    description: "Weather App",
    version: "1.0.1",
    headerTitle: "Weather",
    author: "Created by Krishna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    label: "Weather App",
    description: "Navigate this page for any questions on this app.",
    headerTitle: "Weather",
    author: "Created by Krishna",
  });
});

app.get("/help/*", (req, res) => {
  res.render("pageNotFound", {
    errorDescription: "Help article not found",
    headerTitle: "Weather",
    author: "Created by Krishna",
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound", {
    errorDescription: "Not sure how you landed up here.",
    headerTitle: "Weather",
    author: "Created by Krishna",
  });
});

app.listen(3000, () => {
  console.log("Connecting to port 3000");
});
