'use strict';

module.exports = function(grunt) {
	var serverFiles = ['lib/**/*.js', 'tests/srv/**/*.js', 'models/**/*.js', 'routes/**/*.js', '*.js'];
																																											 
	// load npm tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-nodemon');
	
	// configure tasks
	grunt.initConfig({
		jshint: {
			server: {
				files: {
					src: serverFiles
				},
				options: {
					node: true,
					mocha: true,
					indent: true,
					globals: {
						describe: true,
						it: true,
						before: true,
						after: true,
						beforeEach: true,
						afterEach: true	
					}	
				}
			}
		}, 
		simplemocha: {
			dev: {
				src:['test/srv/**/*_test.js']
			},
			options: {
				globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
				ul: 'bdd',
				reporter: 'tap'
			}
		},
		watch: {
			lint: {
				files: serverFiles,
				tasks: ['jshint:server:dev'],
				options: {
					spawn: false,
				}
			}
		}, 
		nodemon: {
			dev: {
				script: 'server.js'
			}
		}
	});	
	
	// register custom task chains
	grunt.registerTask('lint', ['jshint:server:files']);
	grunt.registerTask('test', ['simplemocha:dev']);
	grunt.registerTask('default', ['lint', 'test']);
};