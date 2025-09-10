import pino from "pino";
class ClearRouterLogger {
    constructor(options = {}) {
        const { name = "clearrouter", level = this.getDefaultLevel(), prettyPrint = this.shouldPrettyPrint(), } = options;
        this.logger = pino({
            name,
            level,
            ...(prettyPrint && {
                transport: {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        translateTime: "HH:MM:ss Z",
                        ignore: "pid,hostname",
                    },
                },
            }),
        });
    }
    getDefaultLevel() {
        const nodeEnv = process.env.NODE_ENV;
        if (nodeEnv === "test") {
            return "warn";
        }
        if (nodeEnv === "production") {
            return "info";
        }
        return "debug";
    }
    shouldPrettyPrint() {
        const nodeEnv = process.env.NODE_ENV;
        const forcePretty = process.env.LOG_PRETTY === "true";
        const forceJson = process.env.LOG_PRETTY === "false";
        if (forceJson) {
            return false;
        }
        if (forcePretty) {
            return true;
        }
        // Pretty print in development, JSON in production
        return nodeEnv !== "production";
    }
    // Core logging methods
    trace(message, extra) {
        this.logger.trace(extra, message);
    }
    debug(message, extra) {
        this.logger.debug(extra, message);
    }
    info(message, extra) {
        this.logger.info(extra, message);
    }
    warn(message, extra) {
        this.logger.warn(extra, message);
    }
    error(message, error) {
        if (error instanceof Error) {
            this.logger.error({ err: error }, message);
        }
        else {
            this.logger.error(error, message);
        }
    }
    fatal(message, error) {
        if (error instanceof Error) {
            this.logger.fatal({ err: error }, message);
        }
        else {
            this.logger.fatal(error, message);
        }
    }
    // Create child logger with additional context
    child(bindings) {
        const childPino = this.logger.child(bindings);
        const childLogger = Object.create(ClearRouterLogger.prototype);
        childLogger.logger = childPino;
        return childLogger;
    }
}
// Default logger instance
export const logger = new ClearRouterLogger();
// Factory function for creating named loggers
export function createLogger(options) {
    return new ClearRouterLogger(options);
}
export { ClearRouterLogger };
