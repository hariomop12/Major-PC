import type { tables } from "./index";
import type { InferSelectModel } from "drizzle-orm";
export declare const errorDetails: any;
export declare const toolFunction: any;
export declare const tool: any;
export declare const toolChoice: any;
export declare const toolCall: any;
export declare const tools: any;
export declare const toolResults: any;
export type Log = InferSelectModel<typeof tables.log>;
export type ApiKey = InferSelectModel<typeof tables.apiKey>;
export type Project = InferSelectModel<typeof tables.project>;
//# sourceMappingURL=types.d.ts.map