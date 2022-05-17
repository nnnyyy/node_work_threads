import { Worker, WorkerOptions } from 'worker_threads';
import express from 'express';
const app = express();
const isDev = process.env.NODE_ENV === 'development'
console.log('isDev : ', isDev);

import WorkerMan, {WORKER_TYPE} from './workerman'

(async ()=> {    
    
    WorkerMan.initialize()    
    WorkerMan.runAll()

    app.listen(3000, ()=> {
        console.log('main process is running')    
    })
})()

process.on('exit', ()=> {
    console.log('program exit')
})