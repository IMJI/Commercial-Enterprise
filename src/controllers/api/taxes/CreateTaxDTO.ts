import BaseDTO from '../../../types/dto/BaseDTO';

class CreateTaxDTO extends BaseDTO {
	name!: string;
	value!: number;
}

export default CreateTaxDTO;
