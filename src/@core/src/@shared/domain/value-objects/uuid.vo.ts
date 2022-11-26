import { v4 as uuidV4, validate as isValidUuid } from 'uuid';
import InvalidUuidError from '../exceptions/invalid-uuid.error';
import { ValueObject } from './value-object';

export class UuidValueObject extends ValueObject {
  constructor(_value: string | null = null) {
    super(_value ?? uuidV4());
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  protected validate(): void {
    if (!isValidUuid(this.value)) {
      throw new InvalidUuidError();
    }
  }
}
