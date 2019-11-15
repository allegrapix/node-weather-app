const request = require('request');
const weatherKey = `643d3012d1dab0624df621a2ded92508`;

const forecast = (latitude, longitude, forecastCallback) => {
	const url = `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}?units=si`;
	request({ url, json: true }, (error, { body }) => {
		if(error) {
			forecastCallback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			forecastCallback('Unable to find location');
		} else {
			forecastCallback(undefined, body);
		}
	});
};

module.exports = forecast;