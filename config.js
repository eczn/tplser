// config.js
var browserify = {
	// Enable source maps 
	debug: true, 
	// Additional file extensions to make optional 
	extensions: ['.coffee', '.hbs'], 
	// A separate bundle will be generated for each 
	// bundle config in the list below bundleConfigs: 
	[
		{
			entries: './' + srcAssets + '/javascripts/application.js',
			dest: developmentAssets + '/js',
			outputName: 'application.js'
		},
		{
			entries: './' + srcAssets + '/javascripts/head.js',
			dest: developmentAssets + '/js', outputName: 'head.js'
		}
	]
}


