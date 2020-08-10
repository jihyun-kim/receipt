const router = require('express').Router();
const Search = require('../models/search');
const moment = require('moment');

router.get('/index', (req, res) => {
  res.render('./searchs/index', {data :''});  
});

//// Search   Method
router.get('/api/search/:pKey&:pStr', (req, res) => {
  Search.searchIdmsts(req.params.pKey, req.params.pStr)
    .then((idmsts) => {
      //console.log('---1---', idmsts);
      res.send(idmsts);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/index2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Search.searchOpdrpt(Today,'*')
    .then((idmsts) => {
      //console.log('---1---', idmsts);
      //console.log(Today);
      res.render('./searchs/index2', {today:Today, data:idmsts});  
    })
    .catch(err => res.status(500).send(err));
});

//// Search   Method
router.get('/api/search2/:pIndate&:pNeStatus', (req, res) => {
  Search.searchOpdrpt(req.params.pIndate, req.params.pNeStatus)
    .then((idmsts) => {
      //console.log('---1---', idmsts);
      res.send( idmsts );
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
