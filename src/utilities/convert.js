class Convert {
  /**
   * Converts the input variable to boolean type
   * @param {*} input
   */
  static toBool(input) {
    if (input === 'true') {
      return true;
    }

    if (input === 'false') {
      return false;
    }

    return !!input;
  }

  /**
   * Converts the input variable with NaN protection
   * @param {*} input
   */
  static toIntSafe(input) {
    const output = parseInt(input, 10);

    if (Number.isNaN(output)) {
      throw new Error(`Parse error: ${input} is not a valid integer!`);
    }

    return output;
  }

  /**
   * Convert the input string to an encoded URL
   * @param {*} input
   */
  static toSafeUrl(input) {
    return encodeURIComponent(input);
  }
}

export default Convert;
