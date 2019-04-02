import {Model} from 'radiks';

export class Todo extends Model {
  static className = 'Todos';

  static schema = {
    title: String,
    completed: {
      type: Boolean,
      decrypted: true,
    },
    deleted: {
      type: Boolean,
      decrypted: true,
    }
  }
}