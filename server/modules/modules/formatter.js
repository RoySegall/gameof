/**
 * Outputting text in a specific format.
 */
module.exports = {

  /**
   * JSONing a value to the page.
   *
   * @param res
   *   Express response object.
   * @param value
   *   The value to jsoninze.
   */
  jsonizer: function(res, value) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(value));
  },

  /**
   * Output json in a specific format.
   *
   * @param res
   *   Express response object.
   * @param code
   *   HTTP response code: 404, 200, 401
   * @param title
   *   The title of the message.
   * @param body
   *   The body of the message.
   */
  httpResponse: function(res, code, title, body) {
    var send = {
      title: title
    };

    if (body != undefined) {
      send.error = body;
    }

    res.setHeader('Content-Type', 'application/json');
    res
      .status(code)
      .send(JSON.stringify(send));
  }

};
