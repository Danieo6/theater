import { Cluster } from 'puppeteer-cluster';
import Logger from '../utilities/logger';

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

  async addJob(jobName, data) {
    Logger.info(`Added new job to the queue: ${jobName}`);
    const script = require(`../jobs/${jobName}.js`); // eslint-disable-line
    const job = new script['default'](data); // eslint-disable-line

    await this.cluster.queue(async ({ page }) => {
      job.connectPage(page);
      await job.run();
      Logger.info('Task done');
    });
  }

  async dispatchFromTerminal() {
    const queue = require('../queue.json'); // eslint-disable-line
    queue.forEach(async (job) => {
      await this.addJob(job.name, job.data);
    });
  }
}

const instance = new WorkerService();
export default instance;
