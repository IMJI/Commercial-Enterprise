import Exception from './Exception';

class EntityIsNotSpecifiedException extends Exception {
	constructor(message: string) {
		super(message, 400);
	}
}

export default EntityIsNotSpecifiedException;
