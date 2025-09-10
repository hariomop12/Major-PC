import type { ModelDefinition } from "@llmgateway/models";

export const llmgatewayModels = [
	{
		id: "custom", // custom provider which expects base URL to be set
		name: "Custom Model",
		family: "llmgateway",
		deprecatedAt: undefined,
		deactivatedAt: undefined,
		providers: [
			{
				providerId: "custom", // custom provider which expects base URL to be set
				modelName: "custom",
				inputPrice: undefined,
				outputPrice: undefined,
				requestPrice: undefined,
				contextSize: undefined,
				streaming: true,
				vision: true,
				tools: true,
				supportedParameters: [
					"temperature",
					"max_tokens",
					"top_p",
					"frequency_penalty",
					"presence_penalty",
				],
			},
		],
		jsonOutput: true,
	},
	{
		id: "auto", // native automatic routing
		name: "Auto Route",
		family: "llmgateway",
		deprecatedAt: undefined,
		deactivatedAt: undefined,
		providers: [
			{
				providerId: "custom", // custom provider which expects base URL to be set
				modelName: "auto",
				inputPrice: undefined,
				outputPrice: undefined,
				requestPrice: undefined,
				contextSize: undefined,
				streaming: true,
				vision: true,
				tools: true,
				supportedParameters: [
					"temperature",
					"max_tokens",
					"top_p",
					"frequency_penalty",
					"presence_penalty",
				],
			},
		],
		jsonOutput: true,
	},
] as const satisfies ModelDefinition[];
