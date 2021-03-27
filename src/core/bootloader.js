import { Cluster } from 'puppeteer-cluster';
import Convert from '../utilities/convert';
import WorkerService from './service';
import Listener from './listener';
import Logger from '../utilities/logger';

class Bootloader {
  async init() {
    Logger.info('Booting up...');

    try {
      // Launch worker service
      await WorkerService.launch(this.configuration);

      // Launch listener service
      if (Convert.toBool(process.env.ENABLE_LISTENER)) {
        await Listener.launch();
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  get configuration() {
    const headless = Convert.toBool(process.env.HEADLESS);
    const maxConcurrency = Convert.toIntSafe(process.env.MAX_INSTANCES);
    // const timeout = Convert.toIntSafe(process.env.GLOBAL_TIMEOUT);

    return {
      concurrency: Cluster.CONCURRENCY_BROWSER,
      maxConcurrency,
      monitor: false,
      puppeteerOptions: {
        headless,
      },
    };
  }
}

export default Bootloader;
