import { DataSource, SelectQueryBuilder } from 'typeorm';
import Outgoing from '../../../models/Outgoing';
import Price from '../../../models/Price';
import { ICreateAPI } from '../../../types/DatabaseAPI';
import { OutgoingBody } from '../../old_api/OutgoingBodyPareser';

class OutgoingCreateAPI implements ICreateAPI<Outgoing> {
	public create(dataSource: DataSource, body: OutgoingBody): Promise<void | Outgoing | Outgoing[]> {
		// return dataSource
		//     .getRepository(Price)
		//     .createQueryBuilder('price')
		//     .leftJoinAndSelect('price.product', 'product')
		//     .where('product.vendorCode = :vendorCode', { vendorCode: body.product })
		//     .getOne()
		//     .then((data) => {
		//         const outgoing = {
		//             ...body,
		//             cost: data.value * body.quantity
		//         };
		//         dataSource
		//             .createQueryBuilder()
		//             .insert()
		//             .into(Outgoing)
		//             .values({ product: () => 10000 })
		//             .execute();
		//     }

		return new Promise((resolve, reject) => {
			dataSource
				.getRepository(Price)
				.createQueryBuilder('price')
				.leftJoinAndSelect('price.product', 'product')
				.where('product.vendorCode = :vendorCode', { vendorCode: body.product })
				.getOne()
				.then((data) => {
					const outgoing = {
						...body,
						cost: data.value * body.quantity
					};
					const queryBuilder = dataSource.createQueryBuilder().insert().into(Outgoing).values({}).execute();

					//resolve(queryBuilder);
				});
		});
	}
}

export default new OutgoingCreateAPI();
