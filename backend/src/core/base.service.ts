import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class BaseService {
  protected toDto<T, V>(dtoClass: ClassConstructor<T>, entity: V): T {
    return plainToInstance(dtoClass, entity, { excludeExtraneousValues: true });
  }

  protected toDtos<T, V>(dtoClass: ClassConstructor<T>, entities: V[]): T[] {
    return entities.map(entity => this.toDto(dtoClass, entity));
  }
}
