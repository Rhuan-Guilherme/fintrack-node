export class UserAlreadyExists extends Error {
  constructor() {
    super("user already exists");
  }
}
