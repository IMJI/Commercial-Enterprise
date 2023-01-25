import Exception from './Exception';

class EntityIsNotSpecified extends Exception {
	constructor(message: string) {
		super(message, 400);
	}
}

export default EntityIsNotSpecified;
