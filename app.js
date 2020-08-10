// 참고자료를 사전에 읽어주세요
// https://poiemaweb.com/mongoose

// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport'); // 여기와
const passportConfig = require('./passport'); // 여기

const app = express();
const port = process.env.PORT || 4523;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Static File Service
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
const session = require('express-session');
app.use(session({ secret: '비밀이지요', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(); // 이 부분 추가

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/', require('./routes/index'));
app.use('/idmsts', require('./routes/idmsts'));
app.use('/nations', require('./routes/nations'));
app.use('/depts', require('./routes/depts'));
app.use('/opdrpts', require('./routes/opdrpts'));
app.use('/trdshds', require('./routes/trdshds'));
app.use('/receipts', require('./routes/receipts'));
app.use('/opdords', require('./routes/opdords'));
app.use('/searchs', require('./routes/searchs'));
app.use('/statistics', require('./routes/statistics'));
app.use('/volunteers', require('./routes/volunteers'));
app.use('/volunteerMsgs', require('./routes/volunteerMsgs'));
app.use('/conditions', require('./routes/conditions'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
