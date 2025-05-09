import getApplication from "./index";

// load the configuration
const { config, app } = getApplication();

// starts the server and listens on the configured ports.
app.listen(config.network.port, config.network.host, () => {
  if (config.logger) {
    config.logger.info("Starting server...");
    config.logger.debug(
      `Starting server on http://${config.network.host}:${config.network.port}`,
    );
  }
});
