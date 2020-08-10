const router = require('express').Router();
const Statistics = require('../models/statistics');
const moment = require('moment');

// 과별통계  메인 화면
router.get('/index', (req, res) => {
  res.render('./statistics/index', {data :''});  
});

// 과별통계  쿼리 생성
router.get('/api/search/:year&:month', (req, res) => {
  Statistics.statisticsDepts(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---1---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});

// 국가별통계  메인 화면
router.get('/index2', (req, res) => {
  res.render('./statistics/index2', {data :''});  
});

// 국가별통계  쿼리 생성
router.get('/api/search2/:year&:month', (req, res) => {
  Statistics.statisticsNations(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---1---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});

// 종합통계 - 처방별통계  메인 화면
router.get('/index3', (req, res) => {
  res.render('./statistics/index3', {data :''});  
});

// 종합통계 - 1) 진료건수   쿼리 생성
router.get('/api/search3/:year&:month', (req, res) => {
  Statistics.statisticsOrds1(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---1---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});
// 종합통계 - 2) 환자 남여  쿼리 생성
router.get('/api/search4/:year&:month', (req, res) => {
  Statistics.statisticsOrds2(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---2---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});
// 종합통계 - 3) 초재진   쿼리 생성
router.get('/api/search5/:year&:month', (req, res) => {
  Statistics.statisticsOrds3(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---3---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});
// 종합통계 - 4) 처방별통계  쿼리 생성
router.get('/api/search6/:year&:month', (req, res) => {
  Statistics.statisticsOrds4(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---4---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});
// 종합통계 - 5) 자원봉사통계  쿼리 생성
router.get('/api/search7/:year&:month', (req, res) => {
  Statistics.statisticsOrds5(req.params.year, req.params.month)
    .then((statistics) => {
      //console.log('---4---', statistics);
      res.send(statistics);
    })
    .catch(err => res.status(500).send(err));
});

/*
router.get('/index2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Search.searchOpdrpt(Today)
    .then((idmsts) => {
      //console.log('---1---', idmsts);
      //console.log(Today);
      res.render('./searchs/index2', {data : idmsts});  
    })
    .catch(err => res.status(500).send(err));
});

//// Search   Method
router.get('/api/search2/:pKey&:pStr', (req, res) => {
  Search.searchOpdrpt(req.params.pKey, req.params.pStr)
    .then((idmsts) => {
      //console.log('---1---', idmsts);
      res.send(idmsts);
    })
    .catch(err => res.status(500).send(err));
});
*/
module.exports = router;
