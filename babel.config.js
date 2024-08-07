module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./src"],
					extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
					alias: {
						"*": ".",
						"@root": "./",
						"@src": "./src",
						"@components": "./src/components",
						"@screens": "./src/screens",
						"@navigation": "./src/navigation",
						"@utils": "./src/utils",
						"@api": "./src/api",
					},
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
