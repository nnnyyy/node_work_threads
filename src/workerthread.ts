import { Worker, WorkerOptions } from 'worker_threads';

const isDev = process.env.NODE_ENV === 'development'
function workerTs(filename: string, workerOptions: WorkerOptions) { workerOptions.eval = true; if (!workerOptions.workerData) { workerOptions.workerData = {}; } workerOptions.workerData.__filename = filename; return new Worker( ` const wk = require('worker_threads'); require('ts-node').register(); let file = wk.workerData.__filename; require(file); `, workerOptions, ); }

//  워커 스레드
export class WorkerThread {
    filename:string|URL = ''
    _worker:Worker|undefined
    constructor(workerFileName:string|URL) {
        this.filename = workerFileName
    }

    run() {
        if( this.isRunning() ) return
        this._worker = isDev ? workerTs(`${__dirname}/jobs/${String(this.filename)}.ts`, {}) : new Worker(`${__dirname}/jobs/${String(this.filename)}.js`, {});         
        if( this._worker ) {
            this._worker.on('message', this.onMessage)
            this._worker.on('exit', this.onExit)
        }
    }

    stop() {
        if(this._worker) this._worker.postMessage(`exit`);
    }

    isRunning() {
        return this._worker ? true : false
    }

    onMessage(val:any) {
        console.log(`onMessage`, val)
        this._worker?.terminate().then(d=>{
            this._worker = undefined
        })
    }

    onExit(exitCode:any) {
        console.log(`onExit`, exitCode)
    }
}