import Category from './Category';
import CategoryDTO from './CategoryDTO';

class CategoryMapper {
	public static toDomain(dto: CategoryDTO): Category {
		const category = new Category();
		if (dto.id) category.id = dto.id;
		if (dto.name) category.name = dto.name;
		category.isDeleted = false;

		return category;
	}

	public static toDTO(domain: Category): CategoryDTO {
		const dto = new CategoryDTO();
		dto.id = domain.id;
		dto.name = domain.name;

		return dto;
	}
}

export default CategoryMapper;
