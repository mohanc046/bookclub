/** Express Server
 * @module server/express
 */

const startServer = async () => {

  /**
   * Module containing middlewares and routes
   * @const
   */
  const app = require("../app");

  /**
   * Setting the port to application
   */
  app.set("port", process.env.PORT);

  /**
   * HTTP module
   */
  const http = require("http");

  /**
   * Creating HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided connected port.
   */
  server.listen(process.env.PORT);

  return server;
};

module.exports.bootstrapServer = () => {
  return startServer();
};
