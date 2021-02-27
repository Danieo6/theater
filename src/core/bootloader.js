import { Cluster } from 'puppeteer-cluster';
import Convert from '../utilities/convert';
import WorkerService from './service';
import Listener from './listener';
import Logger from '../utilities/logger';

class Bootloader {
  async init() {
    Logger.info('Booting up...');
    // Get configuration
    const config = this.getConfiguration();

    try {
      // Launch worker service
      await WorkerService.launch(config);

      // Launch listener service
      if (Convert.toBool(process.env.ENABLE_LISTENER)) {
        await Listener.launch();
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  getConfiguration() {
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
