import Exception from './Exception';

class ForbiddenException extends Exception {
	constructor(message: string) {
		super(message, 403);
	}
}

export default ForbiddenException;
