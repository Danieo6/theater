import express from 'express';
import bodyParser from 'body-parser';
import Convert from '../utilities/convert';
import Logger from '../utilities/logger';
import WorkerService from './service';

class Listener {
  constructor() {
    if (!Listener.instance) {
      Listener.instance = this;
    }

    return Listener.instance;
  }

  launch() {
    const port = Convert.toIntSafe(process.env.LISTENER_PORT);

    this.server = express();
    this.server.use(bodyParser.json());

    this.server.post('/job', async (request, response) => {
      const task = request.body;
      Logger.info(`Received new task: ${task.name}`);
      await WorkerService.addJob(task.name, task.data);
      response.status(200).send({ msg: 'Task dispatched!' });
    });

    this.server.listen(port, () => {
      Logger.info(`Puppet Listener started on port ${port}`);
    });
  }
}

const instance = new Listener();
export default instance;
