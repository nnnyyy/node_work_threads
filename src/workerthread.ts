import { Worker, WorkerOptions } from 'worker_threads';

const isDev = process.env.NODE_ENV === 'development'
function workerTs(filename: string, workerOptions: WorkerOptions) { workerOptions.eval = true; if (!workerOptions.workerData) { workerOptions.workerData = {}; } workerOptions.workerData.__filename = filename; return new Worker( ` const wk = require('worker_threads'); require('ts-node').register(); let file = wk.workerData.__filename; require(file); `, workerOptions, ); }

//  워커 스레드
export class WorkerThread {
    filename:string|URL = ''
    _worker:Worker|undefined
    sharedView32!:Int32Array
    constructor(workerFileName:string|URL, sharedView32:Int32Array) {
        this.filename = workerFileName
        this.sharedView32 = sharedView32
    }

    run() {
        if( this.isRunning() ) return
        this._worker = isDev ? workerTs(`${__dirname}/jobs/${String(this.filename)}.ts`, {}) : new Worker(`${__dirname}/jobs/${String(this.filename)}.js`, {});         
        if( this._worker ) {
            this._worker.on('message', val=>this.onMessage(val))
            this._worker.on('exit', code=>this.onExit(code))
            this._worker.postMessage({ shared: this.sharedView32 })
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
        if( val?.state == 'exit' ) {
            this._worker?.terminate().then(d=>{
                this._worker = undefined
            })
        }        
    }

    onExit(exitCode:any) {
        console.log(`${this.filename} onExit`, exitCode)
    }
}