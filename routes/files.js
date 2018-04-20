const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const fs = require('fs-extra');
const moment = require('moment');

const multer = require('multer');
const upload = multer({dest: './public/original/'});

const sharp = require('sharp');
const ExifImage = require('exif').ExifImage;

const jsonfile = require('jsonfile');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
*get all
 */
router.get('/', (req, res, next) => {
  const Pic = req.app.get('Pic');
  Pic.find().then(d => {
    res.send(d);
  });
});

/*
*get one with id
 */
router.get('/:id', (req, res, next) => {
  const Pic = req.app.get('Pic');
  const id = req.params.id;
  Pic.find({'_id': id}).then(d => {
    res.send(d);
  });
});

/*
* update
 */
router.post('/:param1',
    bodyParser.urlencoded({extended: true}),
    (req, res) => {

    });

/*
*delete file
 */
router.delete('/:id', (req, res, next) => {
  const Pic = req.app.get('Pic');
  console.log('deletexx: ' + req.params.id);
  const id = req.params.id;
  Pic.findOne({'_id': id}).then(d => {
    console.log('thumb' + d.thumbnail);
    fs.remove('public/' + d.thumbnail).then(() => {
      console.log('success!');
    }).catch(err => {
      console.error(err);
    });
    fs.remove('public/' + d.original).then(() => {
      console.log('success!');
    }).catch(err => {
      console.error(err);
    });
    fs.remove('public/' + d.image).then(() => {
      console.log('success!');
    }).catch(err => {
      console.error(err);
    });
    d.remove().then(() => {
      //res.sendStatus(200);
      res.redirect('../');
    });
  });
});

/*
* gps to decimal
 */
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

/*
*post new
 */
router.post('/', upload.single('file'), (req, res, next) => {
  req.body.time = moment();

  req.body.original = 'original/' + req.file.filename;

  req.body.coordinates = JSON.parse(req.body.coordinates);

  console.log('uploading...');


  next();
});

router.use((req, res, next) => {
  try {
    new ExifImage({image: req.file.path}, (error, exifData) => {
      if (error) {
        console.log('Error: ' + error.message);
        next();
      } else {
        console.log(JSON.stringify(exifData.gps));
        req.body.coordinates = {
          lat: gpsToDecimal(exifData.gps.GPSLatitude,
              exifData.gps.GPSLatitudeRef),
          lng: gpsToDecimal(exifData.gps.GPSLongitude,
              exifData.gps.GPSLongitudeRef),
        };
        console.log('coords: ' + req.body.coordinates);
        next();
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
    next();
  }
});

router.use((req, res, next) => {

  const thumbPath = 'thumb/' + req.file.filename;

  console.log('public/original/' + req.file.filename);

  sharp('./public/original/' + req.file.filename).
      resize(320, 300).
      toFile('public/' + thumbPath, (err, info) => {
        console.log(err);
        console.log(info);
        req.body.thumbnail = thumbPath;
        next();
      });
});

router.use((req, res, next) => {

  const medPath = 'img/' + req.file.filename;

  sharp('public/original/' + req.file.filename).
      resize(770, 720).
      toFile('public/' + medPath, (err, info) => {
        console.log(err);
        console.log(info);
        req.body.image = medPath;
        console.log(JSON.stringify(req.body));
        next();
      });
});

router.use((req, res, next) => {

  const file = './public/data.json';
  let json = null;
  jsonfile.readFile(file, (err, obj) => {
    json = obj;
    json.push(req.body);
    jsonfile.writeFile(file, obj, (err) => {
      console.error(err);
    });
  });
  res.send(json);
  next();
});

router.use((req, res, next) => {
  const Pic = req.app.get('Pic');
  Pic.create(req.body).then(data => {
    console.log(data);
    res.sendStatus(200);
    //res.redirect('../');
  });
});

module.exports = router;