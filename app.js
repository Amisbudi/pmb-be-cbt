const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const typesRouter = require('./routes/types');
const packagequestionsRouter = require('./routes/packagequestions');
const questionsRouter = require('./routes/questions');
const questionUsersRouter = require('./routes/questionusers');
const answersRouter = require('./routes/answers');
const recordsRouter = require('./routes/records');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/types', typesRouter);
app.use('/packagequestions', packagequestionsRouter);
app.use('/questions', questionsRouter);
app.use('/questionusers', questionUsersRouter);
app.use('/answers', answersRouter);
app.use('/records', recordsRouter);

module.exports = app;