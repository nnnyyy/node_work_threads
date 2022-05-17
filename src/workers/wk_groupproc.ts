import {WorkerThread} from '../workerthread'

/**
 * 단체 작업 하기
 */
export class GroupProc extends WorkerThread {
    constructor(sharedView32:Int32Array) {
        super("job_groupproc", sharedView32)
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}