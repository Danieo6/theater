import dotenv from 'dotenv';
import Bootloader from './core/bootloader';
import WorkerService from './core/service';
import Logger from './utilities/logger';

// Initialize configuration
dotenv.config();

// Prepare the boot sequence
const bootloader = new Bootloader();

// Boot the service
bootloader.init()
.then(() => {
  Logger.info('Boot sequence done!');

  if (process.argv[2] === 'execute') {
    Logger.info('Worker running in console mode. Jobs will be dispatched using queue.json');
    WorkerService.dispatchFromTerminal();
  }
})
.catch(error => {
  Logger.info('Process exited with error');
  Logger.info(`Error: ${error}`);
});
