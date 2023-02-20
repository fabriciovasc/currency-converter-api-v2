export class UnauthorizedUser extends Error {
  constructor() {
    super('Unauthorized user');
  }
}
