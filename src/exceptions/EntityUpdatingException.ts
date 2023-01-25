import Exception from './Exception';

class EntityUpdatingException extends Exception {
	constructor(message: string) {
		super(message, 500);
	}
}

export default EntityUpdatingException;
