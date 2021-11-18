import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAdmin = this.usersRepository.findById(user_id);

    if (!userAdmin) {
      throw new Error("User not found.");
    }

    if (userAdmin.admin) {
      return this.usersRepository.list();
    }

    throw new Error("Request User must be Admin.");
  }
}

export { ListAllUsersUseCase };
