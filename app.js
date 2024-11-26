const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const typesRouter = require('./routes/types');
const answersRouter = require('./routes/answers');
const recordsRouter = require('./routes/records');
const questionsRouter = require('./routes/questions');
const questionUsersRouter = require('./routes/questionusers');
const groupQuestionsRouter = require('./routes/groupquestions');
const packagequestionsRouter = require('./routes/packagequestions');
const packagequestionusersRouter = require('./routes/packagequestionusers');

const app = express();

const allowedOrigins = [
  'https://be-cbt.trisakti.ac.id',
  'https://admisi.trisakti.ac.id',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/types', typesRouter);
app.use('/answers', answersRouter);
app.use('/records', recordsRouter);
app.use('/questions', questionsRouter);
app.use('/questionusers', questionUsersRouter);
app.use('/groupquestions', groupQuestionsRouter);
app.use('/packagequestions', packagequestionsRouter);
app.use('/packagequestionusers', packagequestionusersRouter);

module.exports = app;
