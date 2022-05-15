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
    }

    //  작업 목록 및 상태 가져오기
    getStatusAll() {

    }

    //  단일 실행
    run(type:WORKER_TYPE) {
        let _worker_selected = undefined
        switch(type) {
            case WORKER_TYPE.GROUP_PROC: _worker_selected = this.workers.find(w=>w instanceof GroupProc); break;
            case WORKER_TYPE.CLAIM: _worker_selected = this.workers.find(w=>w instanceof Claim); break;
            case WORKER_TYPE.CHARACTER_RECOVERY: _worker_selected = this.workers.find(w=>w instanceof CharacterRecovery); break;
        }
        
        if( _worker_selected ) {
            _worker_selected.run()
        }
    }

    //  전부 실행
    runAll() {
        this.workers.forEach(w=>w.run())
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