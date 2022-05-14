import { Worker, WorkerOptions } from 'worker_threads';
import express from 'express';
const app = express();
const isDev = process.env.NODE_ENV === 'development'
console.log('isDev : ', isDev)

function workerTs(filename: string, workerOptions: WorkerOptions) { workerOptions.eval = true; if (!workerOptions.workerData) { workerOptions.workerData = {}; } workerOptions.workerData.__filename = filename; return new Worker( ` const wk = require('worker_threads'); require('ts-node').register(); let file = wk.workerData.__filename; require(file); `, workerOptions, ); }

app.post('/api/test', (req,res)=> {
    console.log('test!')    
   const worker = isDev ? workerTs(`./src/worker.ts`, {}) : new Worker(`./built/worker.js`, {}); 

    worker.on('message', (result) => {
        console.log('result', result, );
        res.sendStatus(result)
    });
});

(async ()=> {    
    app.listen(3000, ()=> {
        console.log('main process is running')    
    })
})()

process.on('exit', ()=> {
    console.log('program exit')
})