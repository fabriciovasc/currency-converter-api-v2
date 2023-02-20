import { User } from '../entities/user';

export abstract class AuthStrategy<PayloadRequest> {
  abstract validate(payload: PayloadRequest): Promise<User>;
}
