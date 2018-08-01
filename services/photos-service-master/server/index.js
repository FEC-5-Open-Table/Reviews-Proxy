const express = require('express');
const path = require('path');
const db = require('../database/retrievePhoto.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  next();
});

app.use('/restaurant/:id', express.static('public'));


app.get('/restaurant/photos/:restaurantId', (req, res) => {
  const id = Number(req.params.restaurantId);
  db.getPhotos(id, (err, restaurant) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(restaurant[0].photoUrls);
    }
  });
});

module.exports = app;
