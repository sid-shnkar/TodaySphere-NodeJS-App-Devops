const request = require('request');

const newsapi = (countryCode, callback) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=' + encodeURIComponent(countryCode) + '&pageSize=3&apiKey=' + encodeURIComponent(process.env.NEWSAPI_ORG_API_KEY);

    const options = {
        url,
        json: true,
        headers: {
            'User-Agent': 'PostmanRuntime/7.32.2'
        }
    };

    request(options, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to the news service", undefined);
        } else if (body.error) {
            callback("Unable to find news for the current location", undefined);
        } else {
            callback(undefined, {
                articles: body.articles
            });
        }
    });
};

module.exports = newsapi;
