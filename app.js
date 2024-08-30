const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const programstudiesRouter = require('./routes/programstudies');
const categoriesRouter = require('./routes/categories');
const filesRouter = require('./routes/files');
const typesRouter = require('./routes/types');
const packagequestionsRouter = require('./routes/packagequestions');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const recordsRouter = require('./routes/records');
const scheduleexamsRouter = require('./routes/scheduleexams');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/programstudies', programstudiesRouter);
app.use('/categories', categoriesRouter);
app.use('/files', filesRouter);
app.use('/types', typesRouter);
app.use('/packagequestions', packagequestionsRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/records', recordsRouter);
app.use('/scheduleexams', scheduleexamsRouter);

module.exports = app;
