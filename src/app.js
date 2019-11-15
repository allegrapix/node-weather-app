const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

const getGeocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs');
// if the folder is named 'views' you don't need the next line
app.set('views', viewsPath); //Pointing express to the custom template directory 

hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'AleGrapiX'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Pika Chu'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'Pika Chu'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if(!address) {
		return res.send({
			error: 'You must provide a location'
		});
	}
	getGeocode(address, (error, {latitude, longitude, location} = {}) => {
		if(error) {
			return res.send({ error });
		} 
		forecast(latitude, longitude, (weatherError, weatherData) => {
			if(weatherError) {
				return res.send({	error: weatherError	});
			} 
			res.send({
				forecast: weatherData,
				location: location,
				address
			});
		});
	});	
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Help article not found',
		name: 'Pika Chu'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Page not found',
		name: 'Pika Chu'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
