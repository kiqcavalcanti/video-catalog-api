import { UuidValueObject } from '../value-objects/uuid.vo';

export abstract class Entity<Props = any> {
  public readonly uuid: UuidValueObject;

  constructor(public readonly props: Props, uuid?: UuidValueObject | null) {
    this.uuid = uuid || new UuidValueObject();
  }

  get id() {
    return this.uuid.value;
  }

  toJSON(): Required<Props & { id: string }> {
    return {
      id: this.id,
      ...this.props,
    } as Required<Props & { id: string }>;
  }
}
