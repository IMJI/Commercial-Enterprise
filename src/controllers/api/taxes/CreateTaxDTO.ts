import BaseDTO from './BaseDTO';

class CreateTaxDTO extends BaseDTO {
	name!: string;
	value!: number;
}

export default CreateTaxDTO;
