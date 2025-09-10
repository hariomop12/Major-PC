import { type Logger } from "pino";
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
export interface LoggerOptions {
    name?: string;
    level?: LogLevel;
    prettyPrint?: boolean;
}
declare class ClearRouterLogger {
    private logger;
    constructor(options?: LoggerOptions);
    private getDefaultLevel;
    private shouldPrettyPrint;
    trace(message: string, extra?: object): void;
    debug(message: string, extra?: object): void;
    info(message: string, extra?: object): void;
    warn(message: string, extra?: object): void;
    error(message: string, error?: Error | object): void;
    fatal(message: string, error?: Error | object): void;
    child(bindings: object): ClearRouterLogger;
}
export declare const logger: ClearRouterLogger;
export declare function createLogger(options: LoggerOptions): ClearRouterLogger;
export { ClearRouterLogger };
export type { Logger };
//# sourceMappingURL=index.d.ts.map