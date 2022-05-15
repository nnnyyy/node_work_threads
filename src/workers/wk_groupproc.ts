import {WorkerThread} from '../workerthread'

/**
 * 단체 작업 하기
 */
export class GroupProc extends WorkerThread {
    constructor() {
        super("job_groupproc")
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}