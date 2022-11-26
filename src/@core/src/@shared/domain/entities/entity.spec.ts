import { Entity } from './entity';
import { UuidValueObject } from '../value-objects/uuid.vo';

interface Props {
  name: string;
  description: string;
}

class EntitySpecStub extends Entity<Props> {}

describe('Entity Unit Test', () => {
  it('should set props and id', () => {
    let entityStub = new EntitySpecStub({
      name: 'name',
      description: 'description',
    });

    expect(entityStub.props.name).toBe('name');
    expect(entityStub.props.description).toBe('description');
    expect(entityStub.uuid).toBeInstanceOf(UuidValueObject);
    expect(entityStub.id).not.toBeNull();
    expect(typeof entityStub.id).toBe('string');

    entityStub = new EntitySpecStub(
      {
        name: 'name2',
        description: 'description2',
      },
      new UuidValueObject('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9'),
    );

    expect(entityStub.id).toBe('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9');
    expect(entityStub.props.name).toBe('name2');
    expect(entityStub.props.description).toBe('description2');
  });

  it('should convert to json', () => {
    const entityStub = new EntitySpecStub(
      {
        name: 'name',
        description: 'description',
      },
      new UuidValueObject('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9'),
    );

    expect(entityStub.toJSON()).toStrictEqual({
      id: 'f39f2172-f35b-4d8b-a9d2-8eea21edd7c9',
      name: 'name',
      description: 'description',
    });
  });
});
