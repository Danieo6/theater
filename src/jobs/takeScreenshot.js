import Job from '../core/job';
import Logger from '../utilities/logger';

class TakeScreenshot extends Job {
  async run() {
    await this.page.goto(this.url);
    Logger.info(`Taking screenshot on ${this.url}...`);
    await this.page.screenshot({ path: this.input.screenshotName });
    return this.done();
  }
}

export { TakeScreenshot as default };
