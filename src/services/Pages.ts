import { join } from 'path';

const pathToPagesDir = join(__dirname + '/../../pages/');

const Routes: object = {
	index: pathToPagesDir + 'index.html',
	login: pathToPagesDir + 'login.html'
};

export default Routes;
