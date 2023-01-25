import Exception from './Exception';

class ServerIsBusyException extends Exception {
	constructor(message: string) {
		super(message, 503);
	}
}

export default ServerIsBusyException;
