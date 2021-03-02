import axios from 'axios';
import Logger from '../utilities/logger';

class Sender {
  static async send(task) {
    const callback = process.env.CALLBACK_URL;
    try {
      await axios.put(callback, {
        task: {
          id: task.id,
          name: task.name,
          status: task.status,
        },
        data: task.data,
      });
      Logger.info('Task data sent back');
    } catch (error) {
      Logger.error(`Sending task result failed. Error: ${error}`);
    }
  }
}

export default Sender;
