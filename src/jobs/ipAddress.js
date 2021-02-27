import Job from '../core/job';

class IPAddress extends Job {
  async run() {
    await this.page.goto(this.url);
    await this.page.waitForTimeout(1000);
    const ip = await this.page.$eval('#ip', (el) => el.innerText);
    return this.done({ ip });
  }
}

export { IPAddress as default };
