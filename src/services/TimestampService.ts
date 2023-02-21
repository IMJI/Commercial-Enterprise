import { BaseEntity } from "typeorm";

abstract class TimestampService<T extends BaseEntity> {
    public abstract findLatest(parentId: number): Promise<T>;
    public abstract findActualOn(parentId: number, date: Date): Promise<T>;
    public abstract findAll(parentId: number): Promise<T[]>;
    public abstract create(dto: object): Promise<T>;
    public abstract update(dto: object): Promise<T>;
    protected abstract closePrevious(parentId: number, date: Date): Promise<T>;
}

export default TimestampService;