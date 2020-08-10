const router = require('express').Router();
const Volunteer = require('../models/volunteer');

// Find All
router.get('/index', (req, res) => {
  Volunteer.findAll()
    .then((Volunteers) => {
      if (!Volunteers.length) return res.status(404).send({ err: 'Volunteer not found' });
      res.render('./volunteers/index', {data:Volunteers});
    })
    .catch(err => res.status(500).send(err));
});

// Create new Volunteer document
router.get('/insert', (req, res) => {
  res.render('./volunteers/insert', {});
});
// Create new Volunteer document
router.post('/insert', (req, res) => {
  Volunteer.create(req.body)
  //  .then(Volunteer => res.send(Volunteer))
    .catch(err => res.status(500).send(err));
  res.redirect('/volunteers/index');
});

// upddate by  document
router.get('/edit/:vcode', (req, res) => {
  Volunteer.findOneByVcode(req.params.vcode)
    .then((Volunteer) => {
      if (!Volunteer) return res.status(404).send({ err: 'Volunteer not found' });
      res.render('./volunteers/edit', {data:Volunteer});
    })
    .catch(err => res.status(500).send(err));
});
// Update by Volunteerid
router.post('/edit/:vcode', (req, res) => {
  //console.log(req.body);
  Volunteer.updateByVcode(req.params.vcode, req.body)
  //  .then(Volunteer => res.send(Volunteer))
    .catch(err => res.status(500).send(err));
  res.redirect('/volunteers/index');
});


// Delete by Volunteerid
router.get('/delete/:vcode', (req, res) => {
  Volunteer.deleteByVcode(req.params.vcode)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/volunteers/index');
  });

module.exports = router;
