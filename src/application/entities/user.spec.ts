import { User } from './user';
import { faker } from '@faker-js/faker';

describe('User entity', () => {
  it('should be able to returns false because user password is invalid', async () => {
    const user = new User({
      username: faker.internet.email(),
      password: faker.internet.password(),
    });

    await user.hashPassword();

    await expect(
      user.validatePassword(faker.internet.password()),
    ).resolves.toBeFalsy();
  });

  it('should be able to create a user', async () => {
    const password = faker.internet.password();
    const user = new User({
      username: faker.internet.email(),
      password,
    });

    await user.hashPassword();

    await expect(user.validatePassword(password)).resolves.toBeTruthy();
    expect(user).toBeTruthy();
  });
});
