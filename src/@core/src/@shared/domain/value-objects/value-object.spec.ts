import { ValueObject } from './value-object';

class ValueObjectStub extends ValueObject {}

describe('Value Object Unit Test', () => {
  it('should receive correct value', () => {
    let vo = new ValueObjectStub('string value');
    expect(vo.value).toBe('string value');

    vo = new ValueObjectStub({ prop1: 'value1' });
    expect(vo.value).toStrictEqual({ prop1: 'value1' });
  });
});
