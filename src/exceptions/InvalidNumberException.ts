import Exception from './Exception';

class InvalidNumberException extends Exception {
	constructor(message: string) {
		super(message, 400);
	}
}

export default InvalidNumberException;
