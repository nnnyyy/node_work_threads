import { Worker, WorkerOptions } from 'worker_threads';
const isDev = process.env.NODE_ENV === 'development'

function workerTs(filename: string, workerOptions: WorkerOptions) { workerOptions.eval = true; if (!workerOptions.workerData) { workerOptions.workerData = {}; } workerOptions.workerData.__filename = filename; return new Worker( ` const wk = require('worker_threads'); require('ts-node').register(); let file = wk.workerData.__filename; require(file); `, workerOptions, ); }

//  워커 스레드
class WorkerThread {
    filename:string|URL = ''
    _worker:Worker|undefined
    constructor(workerFileName:string|URL) {
        this.filename = workerFileName
    }

    run() {
        this._worker = isDev ? workerTs(`${__dirname}/${String(this.filename)}.ts`, {}) : new Worker(`${__dirname}/${String(this.filename)}.js`, {});         
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

class GroupProc extends WorkerThread {
    constructor() {
        super("job_groupproc")
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}

class Claim extends WorkerThread {
}

class CharacterRecovery extends WorkerThread {
}

class WorkerMan {
    list:WorkerThread[] = []

    //  초기화
    public initialize() {
        this.list.push(new GroupProc())
    }

    //  작업 목록 및 상태 가져오기
    getStatusAll() {

    }

    //  단일 실행
    run() {        
    }

    //  전부 실행
    runAll() {
        this.list.forEach(w=>w.run())
    }

    //  단일 중단
    stop() {        
    }

    //  단일 중단
    stopAll() {        
    }
}

const __obj__ = new WorkerMan()
export default __obj__