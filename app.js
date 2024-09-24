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
const packagequestionsRouter = require('./routes/packagequestions');
const packagequestionusersRouter = require('./routes/packagequestionusers');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/types', typesRouter);
app.use('/answers', answersRouter);
app.use('/records', recordsRouter);
app.use('/questions', questionsRouter);
app.use('/questionusers', questionUsersRouter);
app.use('/packagequestions', packagequestionsRouter);
app.use('/packagequestionusers', packagequestionusersRouter);

module.exports = app;