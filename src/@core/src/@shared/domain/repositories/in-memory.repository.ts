import { IRepository } from './repository.interface';
import { UuidValueObject } from '../value-objects/uuid.vo';
import { Entity } from '../entities/entity';
import EntityNotFoundByIdError from '../exceptions/entity-not-found.error';

export abstract class InMemoryRepository<E extends Entity>
  implements IRepository<E>
{
  public collection: E[] = [];

  async insert(entity: E): Promise<void> {
    this.collection.push(entity);
  }

  async update(entity: E): Promise<void> {
    const index = this.collection.findIndex((item) => item.id === entity.id);

    if (index === -1) {
      throw new EntityNotFoundByIdError(
        'Entity not found using id ' + entity.id,
      );
    }

    this.collection[index] = entity;
  }

  async findById(uuid: string | UuidValueObject): Promise<E> {
    const id: string = typeof uuid === 'string' ? uuid : uuid.value;

    const entity = this.collection.find((item) => item.id === id);

    if (!entity) {
      throw new EntityNotFoundByIdError('Entity not found using id ' + id);
    }

    return entity;
  }

  async findAll(): Promise<E[]> {
    return this.collection;
  }

  async delete(uuid: string | UuidValueObject): Promise<void> {
    const id: string = typeof uuid === 'string' ? uuid : uuid.value;

    const index = this.collection.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new EntityNotFoundByIdError('Entity not found using id ' + id);
    }

    this.collection.splice(index, 1);
  }
}
