import { response } from 'express';
import { Cluster } from 'puppeteer-cluster';
import Logger from '../utilities/logger';
import Sender from './sender';

class WorkerService {
  constructor() {
    if (!WorkerService.instance) {
      WorkerService.instance = this;
    }

    return WorkerService.instance;
  }

  async launch(config) {
    Logger.info('Launching cluster...');
    this.cluster = await Cluster.launch(config);
  }

  async addJob(jobName, jobId, data) {
    Logger.info(`Added new job to the queue: ${jobName}`);
    const script = require(`../jobs/${jobName}.js`); // eslint-disable-line
    const job = new script['default'](data); // eslint-disable-line

    await this.cluster.queue(async ({ page }) => {
      job.connectPage(page);
      const result = await job.run();

      if (typeof result === 'undefined') {
        Logger.error('Task unsolvable! Nothing is returned.');
        return;
      }

      Sender.send({
        name: jobName,
        id: jobId,
        status: result.status,
        data: result.data,
      });

      if (result.status === 'failed') {
        Logger.error(`Task failed: ${result.msg}`);
        return;
      }

      Logger.info('Task done');
    });
  }

  async dispatchFromTerminal() {
    const queue = require('../queue.json'); // eslint-disable-line
    queue.forEach(async (job, index) => {
      await this.addJob(job.name, `queue-${index}`, job.data);
    });
  }
}

const instance = new WorkerService();
export default instance;
