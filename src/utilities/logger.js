class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }

    return Logger.instance;
  }

  info(msg) {
    console.log(`Info: ${msg}`);
  }

  debug(msg) {
    console.log(`Debug: ${msg}`);
  }

  warning(msg) {
    console.log(`Info: ${msg}`);
  }

  error(msg) {
    console.log(`Error: ${msg}`);
  }
}

const instance = new Logger();
Object.freeze(instance);
export default instance;
