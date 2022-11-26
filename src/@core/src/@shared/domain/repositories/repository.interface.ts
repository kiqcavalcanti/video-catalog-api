import { Entity } from '../entities/entity';
import { UuidValueObject } from '../value-objects/uuid.vo';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(uuid: string | UuidValueObject): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(uuid: string | UuidValueObject): Promise<void>;
}
