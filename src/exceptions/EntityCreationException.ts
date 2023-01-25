import Exception from './Exception';

class EntityCreationException extends Exception {
	constructor(message: string) {
		super(message, 500);
	}
}

export default EntityCreationException;
