import {GroupProc} from './workers/wk_groupproc'
import {Claim} from './workers/wk_claim'
import {CharacterRecovery} from './workers/wk_characterRecovery'
import {WorkerThread} from './workerthread'

export enum WORKER_TYPE {
    GROUP_PROC = 0,    
    CLAIM,
    CHARACTER_RECOVERY 
}

class WorkerMan {
    workers:WorkerThread[] = []

    //  초기화
    public initialize() {
        this.workers.push(new GroupProc())
        this.workers.push(new Claim())
        this.workers.push(new CharacterRecovery())
    }

    //  작업 목록 및 상태 가져오기
    getStatusAll() {

    }

    getWorker(type:WORKER_TYPE) : WorkerThread | undefined {
        let _worker_selected = undefined
        switch(type) {
            case WORKER_TYPE.GROUP_PROC: _worker_selected = this.workers.find(w=>w instanceof GroupProc); break;
            case WORKER_TYPE.CLAIM: _worker_selected = this.workers.find(w=>w instanceof Claim); break;
            case WORKER_TYPE.CHARACTER_RECOVERY: _worker_selected = this.workers.find(w=>w instanceof CharacterRecovery); break;
        }

        return _worker_selected
    }

    //  단일 실행
    run(type:WORKER_TYPE) {
        this.getWorker(type)?.run()
    }

    //  전부 실행
    runAll() {
        this.workers.forEach(w=>w.run())
    }

    //  단일 중단
    stop(type:WORKER_TYPE) {
        this.getWorker(type)?.stop()
    }

    //  전부 중단
    stopAll() {
        this.workers.forEach(w=>w.stop())
    }
}

const __obj__ = new WorkerMan()
export default __obj__