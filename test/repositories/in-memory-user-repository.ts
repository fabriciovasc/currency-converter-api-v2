import { UserRepository } from '../../src/application/repositories/user-repository';
import { User } from '../../src/application/entities/user';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findOne(username: string): Promise<User | null> {
    const user = this.users.find((item) => item.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((item) => item.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
