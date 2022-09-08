import Exception from './Exception';

class WrongNumberException extends Exception {
    constructor(msg: string) {
        super(msg, false, 400);
    }
}

export default WrongNumberException;