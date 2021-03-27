import Job from '../core/job';

class AutoTweet extends Job {
  async run() {
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.goto(this.url);
    await this.page.waitForSelector('input[name="session[username_or_email]"]');

    // Login to the account
    await this.page.focus('input[name="session[username_or_email]"]');
    await this.page.keyboard.type(this.input.user);
    await this.page.focus('input[name="session[password]"]');
    await this.page.keyboard.type(this.input.pass);
    await this.page.click('div[data-testid="LoginForm_Login_Button"]');

    // Write and post the tweet
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
    await this.page.focus('div[aria-label="Tweet text"]');
    await this.page.keyboard.type(this.input.tweet);
    await this.page.click('div[data-testid="tweetButtonInline"]');
    return this.done();
  }
}

export { AutoTweet as default };
