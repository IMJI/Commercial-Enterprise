import { join } from 'path';

const pathToPagesDir = join(__dirname + '/../../pages/');

const routes: object = {
	index: pathToPagesDir + 'index.html',
	login: pathToPagesDir + 'login.html'
};

export default routes;
