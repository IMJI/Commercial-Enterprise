import Exception from './Exception';

class NotFoundException extends Exception {
	constructor(message: string) {
		super(message, 404);
	}
}

export default NotFoundException;
