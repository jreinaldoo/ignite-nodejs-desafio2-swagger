import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userExists = this.users.find((u) => u.id === id);

    return userExists;
  }

  findByEmail(email: string): User | undefined {
    const userExists = this.users.find((u) => u.email === email);

    return userExists;
  }

  turnAdmin(receivedUser: User): User {
    const userExists = this.users.find((u) => u.id === receivedUser.id);
    userExists.admin = true;
    userExists.updated_at = new Date();

    return userExists;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
