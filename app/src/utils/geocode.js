const request = require('request');
const geocodKey = 'pk.eyJ1IjoicnVzYWxleGFuZHJhaW9hbmEiLCJhIjoiY2sxdGE1eTZnMG0wNjNtbTVmdzE2cXB1cCJ9.9tXl6wW01vfJAqPpcg26aA';

const getGeocode = (location, geoCallback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${geocodKey}`;
	request({ url, json: true }, (error, { body }) => {
		if(error) {
			geoCallback('Unable to connect to location services', undefined);
		} else if (body.features.length === 0) {
			geoCallback('Unable to find location. Try another search', undefined);
		} else {
			geoCallback(undefined, {
				location: body.features[0].place_name,
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1]
			});
		}
	});
}

module.exports = getGeocode;