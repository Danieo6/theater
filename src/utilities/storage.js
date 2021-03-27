// eslint-disable-next-line import/no-unresolved
import fs from 'fs/promises';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Logger from './logger';

class Storage {
  constructor() {
    if (!Storage.instance) {
      Storage.instance = this;
    }

    return Storage.instance;
  }

  /**
   * Downloads the provided image
   * @param {strin} url URL to the image you want to download
   * @param {string} path where the image should be saved
   * @returns {string} filename
   */
  async downloadImage(url, path) {
    try {
      const image = await axios.get(url, { responseType: 'arraybuffer' });
      const filename = `${uuid()}.${url.split(/[#?]/)[0].split('.').pop().trim()}`;
      const buffer = Buffer.from(image.data, 'binary');
      await fs.writeFile(`${path}/${filename}`, buffer);
      return filename;
    } catch (error) {
      Logger.error(`Downloading image failed. ${error}`);
      return null;
    }
  }

  /**
   * Appends data to the selected file
   * @param {string} file Path to file
   * @param {string} data Data to be appended
   * @param {boolean} [newLine=true] Append from a new line
   */
  async append(file, data, newLine = true) {
    try {
      await fs.appendFile(file, newLine ? `\r\n${data}` : data);
    } catch (error) {
      Logger.error(`Appending data to ${file} failed. ${error}`);
    }
  }

  /**
   * Pushes a JSON objects to the array in the file. If it doesn't exists it creates.
   * @param {string} file Path to file
   * @param {object} data Data object to be appended
   */
  async appendJson(file, data) {
    try {
      const store = JSON.parse(await fs.readFile(file));
      store.push(data);
      await fs.writeFile(file, JSON.stringify(store));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(file, `[${JSON.stringify(data)}]`);
      } else {
        Logger.error(`Appending data to ${file} failed. ${error}`);
      }
    }
  }
}

const instance = new Storage();
Object.freeze(instance);
export default instance;
