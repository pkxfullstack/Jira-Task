import logger from "./shared/logger/logger.js";
import { env } from "./config/env.js";
import app from "./app.js";

app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on port ${env.PORT}`);
});