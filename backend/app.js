process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// Dependecies
import config from './config/config';
import express from "express";
import bodyParser from "body-parser";
import Models from './models';
// import services from './ws';
import Routes from './routes';
import cluster from 'cluster';
import v8 from 'v8';
import helmet from 'helmet';

const clog = (st, text) => console.log(st, text);

let services = null;
var db = new Models(express, services);
var routes = new Routes(express, db, services);


const app = express();
let server;


const runningServer = function () {
  clog('\x1b[36m%s\x1b[0m', `Lintening in ${config.domain}:${config.port}`);
};

const runServer = () => {
  const router = express.Router();

  clog('\x1b[37m', 'Putting headers');

  app.disable('x-powered-by');
  app.use(helmet());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, refacil-version');
    next();
  });

  clog('\x1b[37m', 'Creating node');

  clog('\x1b[37m', 'Creating Controllers');


  router.use('/board', routes.Board);
  router.use('/assistances', routes.Assistance);


  app.use('/api/v1', router);

  app.use((err, req, res, next) => {
    console.error("GENERAL ERR", err);
    res.status(500).json({ message: "Algo Salió mal" });
  });

  let total = v8.getHeapStatistics().total_available_size;
  let gb = (total/1024/1024/1024).toFixed(2);
  clog('\x1b[33m', `Memory Limit: ${gb} GB`)
}

if (cluster.isMaster) {
  if (config.onlyCore) {
    runServer();
    server = app.listen(config.port, runningServer);
    server.timeout = 2 * 60 * 1000;  

  } else {
    const numCpus = require('os').cpus().length;
    for (let i = 0; i < numCpus; ++i) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker %d died :(', worker.id);
      cluster.fork();
    });

  }
} else {

  runServer();
  server = app.listen(config.port, runningServer);
  server.timeout = 2 * 60 * 1000;
}