import { join } from 'path';

const pathToPagesDir = join(__dirname + '/../../public/pages/');

const routes: object = {
	index: pathToPagesDir + 'index.html',
	login: pathToPagesDir + 'login.html',
	notFound: pathToPagesDir + 'error/not_found.html'
};

export default routes;
