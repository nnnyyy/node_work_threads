import {WorkerThread} from '../workerthread'

export class CharacterRecovery extends WorkerThread {
    constructor() {
        super("job_charrecovery")
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}