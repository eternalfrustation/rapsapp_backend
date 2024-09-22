import { config as dotenvConfig } from 'dotenv';
import http from 'http';

dotenvConfig()

import createError from 'http-errors';
import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import profileRouter from './routes/profile';

var app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
        next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
	res.send("Error")
});

console.log("App init done")
module.exports = app;

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
                // named pipe
                return val;
        }

        if (port >= 0) {
                // port number
                return port;
        }

        return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
        if (error.syscall !== 'listen') {
                throw error;
        }

        var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
                case 'EACCES':
                        console.error(bind + ' requires elevated privileges');
                        process.exit(1);
                        break;
                case 'EADDRINUSE':
                        console.error(bind + ' is already in use');
                        process.exit(1);
                        break;
                default:
                        throw error;
        }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
        var addr = server.address();
        if (!addr) {
                return
        }
        var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr && addr.port;
        console.debug('Listening on ' + bind);
}
