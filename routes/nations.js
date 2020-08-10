const router = require('express').Router();
const Nation = require('../models/nation');

// Find All
router.get('/index', (req, res) => {
  Nation.findAll()
    .then((nations) => {
      if (!nations.length) return res.status(404).send({ err: 'Nation not found' });
      res.render('./nations/index', {data:nations});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Nationid
router.get('/nationcd/:nationcd', (req, res) => {
  Nation.findOneByNationcd(req.params.nationcd)
    .then((nation) => {
      if (!nation) return res.status(404).send({ err: 'Nation not found' });
      res.send(`findOne successfully: ${nation}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new Nation document
router.get('/insert', (req, res) => {
  res.render('./nations/insert', {});
});

// Create new Nation document
router.post('/insert', (req, res) => {
  Nation.create(req.body)
  //  .then(nation => res.send(nation))
    .catch(err => res.status(500).send(err));
  res.redirect('/nations/index');
});

// upddate by  document
router.get('/edit/:nationcd', (req, res) => {
  Nation.findOneByNationcd(req.params.nationcd)
    .then((nation) => {
      if (!nation) return res.status(404).send({ err: 'Nation not found' });
      res.render('./nations/edit', {data:nation});
    })
    .catch(err => res.status(500).send(err));
});

// Update by Nationid
router.post('/edit/:nationcd', (req, res) => {
  console.log(req.body);
  Nation.updateByNationcd(req.params.nationcd, req.body)
  //  .then(Nation => res.send(Nation))
    .catch(err => res.status(500).send(err));
  res.redirect('/nations/index');
});


// Delete by Nationid
router.get('/delete/:nationcd', (req, res) => {
  Nation.deleteByNationcd(req.params.nationcd)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/nations/index');
  });

module.exports = router;
