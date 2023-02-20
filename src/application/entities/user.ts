import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { Replace } from '../helpers/Replace';

interface UserProps {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private readonly _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username() {
    return this.props.username;
  }

  public async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.props.password = await bcrypt.hash(this.props.password, salt);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.props.password);
  }

  public get password() {
    return this.props.password;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
