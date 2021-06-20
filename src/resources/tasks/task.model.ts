import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv1 } from 'uuid';
import { ITask } from 'src/resources/tasks/task.types';

/**
 * Task Interface.
 * @typedef ITask
 * @prop {string} id - Task id
 * @prop {string} title - Task title
 * @prop {number} order - Task order
 * @prop {string} description - Task description
 * @prop {string|number|null} userId - User id
 * @prop {string|number|null} boardId - Board id
 * @prop {string|number|null} columnId - Column id
 */

/** Class representing a task. */
@Entity('task')
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({ type: 'varchar', nullable: true })
  userId!: string | null;

  @Column()
  boardId: string;

  @Column({ nullable: true })
  columnId!: string;

  /**
   * Create a task.
   * @param {ITask} ITask - Task interface
   */
  constructor(
    {
      id = uuidv1(),
      title = '',
      order = 0,
      description = '',
      userId = '',
      boardId = '',
      columnId = '',
    } = {} as ITask
  ) {
    /**
     * Task id.
     * @type {string|number|null}
     */
    this.id = id;
    /**
     * Task title.
     * @type {string}
     */
    this.title = title;
    /**
     * Task order.
     * @type {number}
     */
    this.order = order;
    /**
     * Task description.
     * @type {string}
     */
    this.description = description;
    /**
     * Task userId.
     * @type {string|number|null}
     */
    this.userId = userId;
    /**
     * Task boardId.
     * @type {string|number|null}
     */
    this.boardId = boardId;
    /**
     * Task columnId.
     * @type {string|number|null}
     */
    this.columnId = columnId;
  }

  /**
   * Creates a task instance and returns it.
   * @param {ITask} body - The data from which the new task will be created
   * @return {ITask} - Created task
   */
  static fromRequest(body: ITask): ITask {
    return new Task(body);
  }
}

export default Task;
