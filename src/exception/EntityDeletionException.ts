import Exception from './Exception';

class EntityDeletionException extends Exception {
	constructor(message: string) {
		super(message, 500);
	}
}

export default EntityDeletionException;
