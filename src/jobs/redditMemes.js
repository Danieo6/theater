import Job from '../core/job';

class RedditMemes extends Job {
  async run() {
    await this.page.goto(this.url.replace('www.', 'old.'));
    const memeList = await this.page.$$eval('#siteTable>div:not(.clearleft)', (memes) => memes.map((meme) => meme.dataset.url));
    return this.done(memeList);
  }
}

export { RedditMemes as default };
