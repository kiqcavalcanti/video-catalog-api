import { InMemoryRepository } from './in-memory.repository';
import { Entity } from '../entities/entity';
import { UuidValueObject } from '../value-objects/uuid.vo';
import { v4 as uuidV4 } from 'uuid';
import EntityNotFoundByIdError from '../exceptions/entity-not-found.error';

interface EntityStubProps {
  name: string;
  age: number;
}

class EntityStub extends Entity<EntityStubProps> {}

class InMemoryRepositoryStub extends InMemoryRepository<EntityStub> {}

describe('In Memory Repository Unit Tests', () => {
  let inMemoryRepositoryStub: InMemoryRepositoryStub;

  beforeEach(() => (inMemoryRepositoryStub = new InMemoryRepositoryStub()));

  it('should insert', async () => {
    const entity = new EntityStub({ name: 'Kaique', age: 28 });

    await inMemoryRepositoryStub.insert(entity);

    expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(entity);
  });

  it('should update', async () => {
    const entity = new EntityStub({ name: 'Kaique', age: 28 });

    await inMemoryRepositoryStub.insert(entity);

    const updatedEntity = new EntityStub(
      { name: 'Kaique 2', age: 30 },
      entity.uuid,
    );

    await inMemoryRepositoryStub.update(updatedEntity);

    expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(updatedEntity);
  });

  it('should throw error if not find the entity by id when update', async () => {
    const uuid = uuidV4();

    const uuidVo = new UuidValueObject(uuid);

    const entity = new EntityStub({ name: 'Kaique', age: 28 }, uuidVo);

    await expect(() => inMemoryRepositoryStub.update(entity)).rejects.toThrow(
      'Entity not found using id ' + uuid,
    );

    await expect(() => inMemoryRepositoryStub.update(entity)).rejects.toThrow(
      new EntityNotFoundByIdError('Entity not found using id ' + uuid),
    );
  });

  it('should find the entity by id', async () => {
    const uuid = uuidV4();
    const uuidVo = new UuidValueObject(uuidV4());

    const collection = [
      new EntityStub({ name: 'Kaique', age: 28 }, new UuidValueObject(uuid)),
      new EntityStub({ name: 'Kaique 2', age: 30 }, uuidVo),
    ];

    for (const entity of collection) {
      await inMemoryRepositoryStub.insert(entity);
    }

    expect(await inMemoryRepositoryStub.findById(uuid)).toStrictEqual(
      collection[0],
    );

    expect(await inMemoryRepositoryStub.findById(uuidVo)).toStrictEqual(
      collection[1],
    );
  });

  it('should throw error if not find the entity by id', async () => {
    const uuid = uuidV4();

    await expect(() => inMemoryRepositoryStub.findById(uuid)).rejects.toThrow(
      new EntityNotFoundByIdError('Entity not found using id ' + uuid),
    );
  });

  it('should find all', async () => {
    const collection = [
      new EntityStub({ name: 'Kaique', age: 28 }),
      new EntityStub({ name: 'Kaique 2', age: 30 }),
    ];

    for (const entity of collection) {
      await inMemoryRepositoryStub.insert(entity);
    }

    const entities = await inMemoryRepositoryStub.findAll();

    expect(entities).toStrictEqual(collection);
  });

  it('should delete', async () => {
    const uuid = uuidV4();
    const uuidVo = new UuidValueObject(uuidV4());

    const collection = [
      new EntityStub({ name: 'Kaique', age: 28 }, new UuidValueObject(uuid)),
      new EntityStub({ name: 'Kaique 2', age: 30 }, uuidVo),
    ];

    for (const entity of collection) {
      await inMemoryRepositoryStub.insert(entity);
    }

    await inMemoryRepositoryStub.delete(uuid);

    expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(collection[1]);

    await inMemoryRepositoryStub.delete(uuidVo);

    expect(inMemoryRepositoryStub.collection).toHaveLength(0);
  });

  it('should throw error if not find the entity by id when delete', async () => {
    const uuid = uuidV4();

    await expect(() => inMemoryRepositoryStub.delete(uuid)).rejects.toThrow(
      new EntityNotFoundByIdError('Entity not found using id ' + uuid),
    );
  });
});
