import ManagerService from "../../services/ManagerService";
import PasswordService from "../../services/PasswordService";
import User from "./User";
import UserDTO from "./UserDTO";

class UserMapper {
    public static async toDomain(dto: UserDTO): Promise<User> {
        const user = new User();
        if (dto.id) user.id = dto.id;
        if (dto.email) user.email = dto.email;
        if (dto.firstName) user.firstName = dto.firstName;
        if (dto.lastName) user.lastName = dto.lastName;
        if (dto.patronymic) user.patronymic = dto.patronymic;
        if (dto.manager) user.manager = await ManagerService.findOne(dto.manager);
        if (dto.role) user.role = dto.role;
        //if (dto.password) user.password = await PasswordService.findOne(dto.password);

        return user;
    }
}

export default UserMapper;