import BaseDTO from "../../types/dto/BaseDTO";

class CreateUserDTO extends BaseDTO {
    manager!: number;
    role!: string;
    password!: string;
}

export default CreateUserDTO;