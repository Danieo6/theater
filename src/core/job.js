class Job {
  constructor(data) {
    this.page = null;
    const { url, ...input } = data;
    this.url = url;
    this.input = input;
  }

  connectPage(page) {
    this.page = page;
  }
}

export default Job;
