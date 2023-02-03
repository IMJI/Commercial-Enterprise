import Exception from './Exception';

class AuthException extends Exception {
	constructor(message: string) {
		super(message, 401);
	}
}

export default AuthException;
