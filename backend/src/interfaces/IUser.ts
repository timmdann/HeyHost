export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
