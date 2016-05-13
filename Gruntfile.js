module.exports = function(grunt) {

	grunt.initConfig({
	  concurrent: {
		  dev: {
		    tasks: ['watch', 'nodemon'],
		    options: {
		      logConcurrentOutput: true
		    }
		  }
		},
	  concat: {
	    js: {
	    	src:[
	    		 'public/javascript/vendor/jquery-2.1.0.min.js',
	    		 'public/javascript/vendor/modernizr-2.7.1.min',
	    		 'public/javascript/bootstrap.min.js',
	    		 'public/javascript/vendor/wow.min.js',
	    		 'public/javascript/vendor/vivus-svg-animation.min.js',
	    		 'public/javascript/vendor/jquery.ajaxchimp.js',
	    		 'public/javascript/vendor/typed.min.js',
	    		 'public/javascript/assets/checkbox.js',
	    		 'public/javascript/assets/application.js' ],
	    	dest:'public/build/app.js'
	    },
	    css: {
	    	src:['public/stylesheets/application.css',
	    		 'public/stylesheets/mailchimp.css',
	    		 'public/stylesheets/animations.css',
	    		 'public/stylesheets/result-card.css',
	    		 'public/stylesheets/style.css' ],
	        dest:'public/build/app.min.css'
	    }
	  },
	  uglify: {
	    js: {
	    	src:['public/build/app.js'],
	    	dest:'public/build/app.js'
	    }
	  },
	  cssmin: {
	    minify: {
	    	src: 'public/build/app.min.css',
	    	dest: 'public/build/app.min.css'
	    }
	  },
	  nodemon: {
	  	dev: {
	      script: 'index.js'
	  	}
	  },
	  watch: {
      css: {
        files: '<%=  concat.css.src %>',
        tasks: ['concat','cssmin'],
        options: {
        	livereload: true,
        	nonull: true
        }
      },
      js: {
        files: '<%=  concat.js.src %>',
        tasks: ['concat','uglify'],
        options: {
        	livereload: true,
        	nonull: true
        }
      }
    }
	  // Arbitrary non-task-specific properties.
	  // my_property: 'whatever',
	  // my_src_files: ['foo/*.js', 'bar/*.js'],
	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-nodemon');

	// this would be run by typing "grunt build" on the command line
	grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['concat','uglify', 'cssmin', 'concurrent']);



};