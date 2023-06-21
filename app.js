const path = require("path");
const express = require("express");
const hbs = require("hbs");
const dotenv = require("dotenv");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");
const newsapi = require("./utils/newsapi.js");
const countryCodes = require("./utils/countryCodes.js");
const nasaApod = require("./utils/nasaApod.js");
const boredapi = require("./utils/boredapi.js");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//setup handlebars and viewspath
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup the static directory path
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "TodaySphere",
    name: "Siddharth Shankar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "TodaySphere",
    name: "Siddharth Shankar",
  });
});

app.get("/home", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // GEOCODE API CODE ADDED ---------
  geocode(
    req.query.address,
    (error, { longitude, latitude, location, bodyContext } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      // NEWS API CODE ADDED ---------
      var newsArticles = [];

      // proceed to fetch news only if bodyContext is NOT undefined or empty
      if (bodyContext) {
        const countryObj = bodyContext.slice(-1);
        console.log(`Country: ${countryObj[0].text}`);

        console.log(`Country code: ${countryCodes.get(countryObj[0].text)}`);

        const getCountryCode = countryCodes.get(countryObj[0].text);

        // proceed to fetch news only if we have found a country code for our input country
        if (getCountryCode) {
          newsapi(getCountryCode, (error, { articles } = {}) => {
            if (error) {
              return res.send({ newsError: error });
            }

            //console.log(req.query)
            console.log(articles);
            newsArticles = [...articles];
          });
        }
      }

      // NEWS API CODE ENDED ---------

      // BORED API CODE ADDED ---------
      var boredActivity = "";
      var boredType = "";
      var boredParticipants = 0;

      boredapi((error, { activity, type, participants } = {}) => {
        if (error) {
          return res.send({ boredError: error });
        }

        //console.log(req.query)
        boredActivity = activity;
        boredType = type;
        boredParticipants = participants;
      });

      // BORED API CODE ENDED --------

      // NASA APOD CODE ADDED ---------
      let nasaImageTitle = "";
      let nasaImageUrl = "";

      nasaApod((error, { title, url } = {}) => {
        if (error) {
          return res.send({ nasaError: error });
        }

        // Update the values of nasaImageTitle and nasaImageUrl
        nasaImageTitle = title;
        nasaImageUrl = url;

        // FORECAST API CODE ADDED ---------

        // Call the forecast function inside the nasaApod callback
        forecast(
          latitude,
          longitude,
          (error, { description, temperature, feelslike, humidity } = {}) => {
            if (error) {
              return res.send({ locationError: error });
            }

            console.log(req.query);
            console.log("nasaImageTitle - ", nasaImageTitle);
            console.log("nasaImageUrl - ", nasaImageUrl);
            console.log(boredActivity);
            console.log(boredType);
            console.log(boredParticipants);

            res.send({
              forecast:
                description +
                ". It is currently " +
                temperature +
                " degrees outside. But it feels like " +
                feelslike +
                " degrees. The humidity outside is " +
                humidity +
                "%.",
              location,
              address: req.query.address,
              articles: newsArticles,
              nasaImageTitle: nasaImageTitle,
              nasaImageUrl: nasaImageUrl,
              boredActivity: boredActivity,
              boredType: boredType,
              boredParticipants: boredParticipants,
            });
          }
        );
        // FORECAST API CODE ENDED ---------
      });
    }
  );
  // GEOCODE API CODE ENDED ---------
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "TodaySphere",
    message: "Get any kind of help you want to get",
    name: "Siddharth Shankar",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error_404", {
    error: "404 Help article was not found",
  });
});

app.get("*", (req, res) => {
  res.render("error_404", {
    error: "404 page not found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
