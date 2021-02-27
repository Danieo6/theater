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

  done(data) {
    return {
      status: 'done',
      data,
    };
  }

  error(msg) {
    return {
      status: 'failed',
      msg,
    };
  }
}

export default Job;
