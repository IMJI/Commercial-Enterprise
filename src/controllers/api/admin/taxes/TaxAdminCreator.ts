import TaxCreateOptions from '../../../../models/tax/dto/TaxCreateOptions';
import Tax from '../../../../models/tax/Tax';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';

class TaxAdminCreator implements ICreator<Tax> {
	public async create(options: TaxCreateOptions): Promise<Tax> {
		const { name, value } = options;
		const tax = Tax.create({
			name,
			value,
			isDeleted: false
		});
		await Tax.save(tax);

		return tax;
	}
}

export default new TaxAdminCreator();
