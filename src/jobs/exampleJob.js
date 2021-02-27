import Job from '../core/job';

class ExampleJob extends Job {
  async run() {
    await this.page.goto(this.url);
    return this.done();
  }
}

export { ExampleJob as default };
