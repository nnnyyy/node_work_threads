import {WorkerThread} from '../workerthread'

export class CharacterRecovery extends WorkerThread {
    constructor(sharedView32:Int32Array) {
        super("job_charrecovery", sharedView32)
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}