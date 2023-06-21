const request = require('request');

const nasaApod = (callback) => {
    const url = 'https://api.nasa.gov/planetary/apod';

    const options = {
        url,
        qs: {
            api_key: process.env.NASA_APOD_API_KEY // Adding the API key to the query params
        },
        json: true,
        headers: {
            'User-Agent': 'PostmanRuntime/7.32.2'
        }
    };

    request(options, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to the nasa service", undefined);
        } else if (body.error) {
            callback("Unable to find astronomy picture of the day", undefined);
        } else {
            callback(undefined, {
                title: body.title,
                url: body.hdurl
            });
        }
    });
};

module.exports = nasaApod;
