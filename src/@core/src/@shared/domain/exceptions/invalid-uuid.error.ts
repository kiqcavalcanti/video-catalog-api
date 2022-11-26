export default class InvalidUuidError extends Error {
  constructor() {
    super('Id must be a valid UUID');
    this.name = 'InvalidUuidError';
  }
}
