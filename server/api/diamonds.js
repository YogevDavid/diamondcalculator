const express = require('express');
const Upload = require('upload-file');
const auth = require('../middleware/auth');
const Diamond = require('../models/diamonds');
const router = express.Router();
const { v4: uuid_v4 } = require('uuid');

// Adding a Diamond
router.post('/', auth, async (req, res) => {
  try {
    const { body } = req;
    let diamond = new Diamond({
      ...body,
      user: req.user.id,
      name: body.name || `${body.carat} Carat Diamond`,
    });
    await diamond.save();
    return res.send(diamond);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get Diamond by ID
router.get('/diamond/:diamond_id', auth, async (req, res) => {
  try {
    let diamond = await Diamond.findOne({ _id: req.params.diamond_id });
    return res.send(diamond);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Edit Diamond Values
router.post('/edit/:diamond_id', auth, async (req, res) => {
  try {
    const bodyKeys = Object.keys(req.body);
    if (bodyKeys.length === 0) {
      return res.sendStatus(200);
    }

    let diamond = await Diamond.findOne({ _id: req.params.diamond_id });

    bodyKeys
      .filter((flt) => flt !== '_id')
      .map((key) => (diamond[key] = req.body[key]));

    await diamond.save();
    return res.send(diamond);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Delete a Diamond
router.get('/delete/:diamond_id', auth, async (req, res) => {
  try {
    const diamond = await Diamond.findById(req.params.diamond_id);
    await diamond.remove();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// FindSimilar
router.post('/findsimilar', auth, async (req, res) => {
  try {
    const { carat, matchBy } = req.body;

    let fields = {};
    matchBy.map((match) => (fields[match] = req.body[match]));
    fields.carat ? (fields.catrat = { $gte: carat - 2, $lt: carat + 2 }) : null;

    const diamonds = await Diamond.find({
      ...fields,
    }).limit(4);

    return res.send(diamonds);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get Diamonds by User
router.get('/mydiamonds', auth, async (req, res) => {
  try {
    const diamonds = await Diamond.find({ user: req.user.id });
    return res.send(diamonds);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Uploading a Photo
router.post('/uploaddiamondimage/:diamond_id', auth, async (req, res) => {
  try {
    const uniuqId = uuid_v4();
    const upload = new Upload({
      dest: 'public/diamondimages',
      // maxFileSize: 100 * 1024,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      rename: function (name, file) {
        return `${uniuqId}.${file.filename}`;
      },
    });

    upload.on('end', async (fields, files) => {
      await files.save;
      let diamond = await Diamond.findById(req.params.diamond_id);
      diamond.photoId = files.file.filename;
      await diamond.save();
      return res.send(diamond);
    });

    upload.on('error', function (err) {
      console.log({ err });
      return res.sendStatus(500);
    });

    upload.parse(req);
  } catch (error) {
    console.log({ error });
    return res.sendStatus(400);
  }
});

module.exports = router;
