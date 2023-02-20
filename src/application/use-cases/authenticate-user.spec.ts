import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { AuthenticateUser } from './authenticate-user';
import { User } from '../entities/user';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';

describe('Authenticate user', () => {
  let userRepository: InMemoryUserRepository;
  let validateUser: AuthenticateUser;
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    const jwtService = new JwtService({
      privateKey: faker.hacker.phrase(),
    });
    validateUser = new AuthenticateUser(userRepository, jwtService);
  });

  it('should be throw an error because user is invalid', async () => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const user = new User({
      username,
      password,
    });
    await user.hashPassword();

    await userRepository.create(user);

    await expect(
      validateUser.execute({ username, password: faker.internet.password() }),
    ).rejects.toThrow('Unauthorized user');
  });

  it('should be able to authenticate user', async () => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const user = new User({
      username,
      password,
    });
    await user.hashPassword();

    await userRepository.create(user);

    await expect(validateUser.execute({ username, password })).resolves.toEqual(
      {
        accessToken: expect.any(String),
      },
    );
  });
});
