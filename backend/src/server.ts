import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import cluster from 'cluster';
import os from 'os';
import colors from 'colors';

const numCPUs = os.cpus().length;

// * ------------ ROUTERS --------------------
import v1AuthenticationRouter from './routes/v1AuthenticationRouter.js';
// * ------------ ROUTERS --------------------

// * ------------ MIDDLEWARES --------------------
import errorHandler from './middlewares/errorHandler.js';
// * ------------ MIDDLEWARES --------------------

mongoose.set('strictQuery', false);

const app = express();

app.use(helmet({
    dnsPrefetchControl: {
        allow: false,
    },
    frameguard: {
        action: "deny",
    },
    hidePoweredBy: true,
    noSniff: true,
    referrerPolicy: {
        policy: ["origin"]
    },
    xssFilter: true,
    hsts: {
        maxAge: 31536000, // * 1 year in seconds
        includeSubDomains: true,
        preload: true
    },
    contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameSrc: ["'none'"]
        }
    }
}));
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(
  cors({
      origin: ['*', process.env["REACT_URL"] as string],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
  })
);

app.use('/api/v1/authentication', v1AuthenticationRouter);

app.get("*", (req: express.Request, res: express.Response) => {
    res.writeHead(302, {'Location': `${process.env["REACT_URL"] as string}/home`});
    res.end();
});

app.use(errorHandler);
colors.enable();
if (process.env["NODE_ENV"] as string === "PRODUCTION") {
    
    const server = http.createServer(app);
    if(cluster.isPrimary) {
        const styles: string[] = [
            "font-size: 12px",
            "font-family: monospace",
            "background: white",
            "display: inline-block",
            "color: black",
            "padding: 8px 19px",
            "border: 1px dashed"
        ];
        console.log("%cHi 👋! The server is now running! \n".green, styles.join(";"));
        console.log(`Master ${process.pid} is now running`.yellow);
        console.log(`Workers:`.magenta);

        for(let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    }else {
        mongoose.connect(process.env["MONGO_DB_URI"] as string)
        .then(() => {
            server.listen(process.env["PORT"] as string, () => {
                console.log(`Worker ${process.pid} is now started and listening on PORT ${process.env["PORT"] as string}`);
            });
        })
        .catch((error) => {
            console.log(`File: server.js - ${error}`);
            mongoose.disconnect();
        });
    }
}else {
    const server = http.createServer(app);

    const styles: string[] = [
        "font-size: 12px",
        "font-family: monospace",
        "background: white",
        "display: inline-block",
        "color: black",
        "padding: 8px 19px",
        "border: 1px dashed"
    ];
    console.clear();
    console.log("%cHi 👋! The server is now running! \n".green, styles.join(";"));

    mongoose.connect(process.env["MONGO_DB_URI"] as string)
    .then(() => {
        server.listen(process.env["PORT"] as string, () => {
            console.log(`Worker ${process.pid} is now started and listening on PORT ${process.env["PORT"] as string}`);
        });
    })
    .catch((error) => {
        console.log(`File: server.js - ${error}`);
        mongoose.disconnect();
    });
}