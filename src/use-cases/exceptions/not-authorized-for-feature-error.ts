export class NotAuthorizedForFeatureError extends Error {
  constructor() {
    super("not authorized for this feature");
  }
}
