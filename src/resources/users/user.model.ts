import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv1 } from 'uuid';
import { IUser, IUserHidden } from './user.types';

/**
 * User interface.
 * @typedef IUser
 * @prop {string} id - User id
 * @prop {string} name - User name
 * @prop {string} login - User login
 * @prop {string} password - User password
 */

/**
 * User interface without public properties.
 * @typedef IUserHidden
 * @prop {string} id - User id
 * @prop {string} name - User name
 * @prop {string} login - User login
 */

/** Class representing a user. */
@Entity('user')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * Create a user.
   * @param {IUser} IUser - User interface
   */
  constructor({ id = uuidv1(), name = '', login = '', password = '' } = {}) {
    /**
     * User id.
     * @type {string}
     */
    this.id = id;
    /**
     * User name.
     * @type {string}
     */
    this.name = name;
    /**
     * User login.
     * @type {string}
     */
    this.login = login;
    /**
     * User password.
     * @type {string}
     */
    this.password = password;
  }

  /**
   * Hides public properties from the user's instance.
   * @param {IUser} user - User instance
   * @return {IUserHidden} - User instance without public properties
   */
  static toResponse(user: IUser): IUserHidden {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * Creates a user instance and returns it.
   * @param {IUser} body - The data from which the new user will be created
   * @return {IUser} - Created user
   */
  static fromRequest(body: IUser): IUser {
    return new User(body);
  }
}

export default User;
