import { User } from '../services/auth.service';
import * as faker from 'faker';

export class UserFactory {
  static create(data?: Object): User {
    return User.create(Object.assign({
      id: faker.random.number(),
      username: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      group: 'rider',
      photo: faker.image.imageUrl()
    }, data));
  }
}
