import { UuidValueObject } from './uuid.vo';
import InvalidUuidError from '../exceptions/invalid-uuid.error';
import spyOn = jest.spyOn;

describe('Uuid Value Object Unit Test', () => {
  const spyValidate = spyOn(UuidValueObject.prototype as any, 'validate');

  it('should throw exception if is an invalid uuid string', () => {
    expect(() => new UuidValueObject('invalid uuid')).toThrowError(
      InvalidUuidError,
    );

    expect(spyValidate).toBeCalledTimes(1);
  });
  it('should set correct values', () => {
    const uuid = new UuidValueObject('d7f000d3-64cb-415b-98f0-5f1fd042dbd0');

    expect(uuid.value).toBe('d7f000d3-64cb-415b-98f0-5f1fd042dbd0');
    expect(spyValidate).toBeCalledTimes(1);
  });
});
