import http from "http";

import app from "./app";
import logging from "./config/logger";
import { SERVER_PORT, SERVER_HOSTNAME } from "./config/config";

const httpServer = http.createServer(app);

httpServer.listen(SERVER_PORT, () => {
  logging.info(`Server is running on http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
});

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);
