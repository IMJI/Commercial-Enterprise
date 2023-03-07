import Exception from './Exception';

class StockException extends Exception {
	constructor(message: string) {
		super(message, 400);
	}
}

export default StockException;
