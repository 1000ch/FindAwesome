module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      jsapp: {
        src: 'public/js/main.js',
        dest: 'public/js/app.js'
      }
    },
    concat: {
      jslib: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/mustache/mustache.js'
        ],
        dest: 'public/js/lib.js'
      },
      csslib: {
        src: [
          'bower_components/normalize.css/normalize.css',
          'bower_components/font-awesome/css/font-awesome.css'
        ],
        dest: 'public/css/lib.css'
      },
      cssapp: {
        src: [
          'public/css/main.css'
        ],
        dest: 'public/css/app.css'
      }
    },
    uglify: {
      jslib: {
        files: {
          'public/js/lib.min.js': 'public/js/lib.js'
        }
      },
      jsapp: {
        files: {
          'public/js/app.min.js': 'public/js/app.js'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      'public/css/app.css': 'public/css/app.css'
    },
    csscomb: {
      csslib: {
        files: {
          'public/css/lib.css': 'public/css/lib.css'
        }
      },
      cssapp: {
        files: {
          'public/css/app.css': 'public/css/app.css'
        }
      }
    },
    csso: {
      csslib: {
        files: {
          'public/css/lib.min.css': 'public/css/lib.css'
        }
      },
      cssapp: {
        files: {
          'public/css/app.min.css': 'public/css/app.css'
        }
      }
    },
    copy: {
      css: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/css/font-awesome.min.css'],
          dest: 'public/css/',
          filter: 'isFile'
        }]
      },
      font: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/fonts/*'],
          dest: 'public/fonts/',
          filter: 'isFile'
        }]
      }
    },
    watch: {
      jslib: {
        files: ['<%=concat.jslib.src%>'],
        tasks: ['concat:jslib', 'uglify:jslib']
      },
      jsapp: {
        files: ['<%=browserify.jsapp.src%>'],
        tasks: ['browserify:jsapp', 'uglify:jsapp']
      },
      csslib: {
        files: ['<%=concat.csslib.src%>'],
        tasks: ['concat:csslib', 'csscomb:csslib', 'csso:csslib']
      },
      cssapp: {
        files: ['<%=concat.cssapp.src%>'],
        tasks: ['concat:cssapp', 'autoprefixer', 'csscomb:cssapp', 'csso:cssapp']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('build:js',    ['concat:jslib', 'browserify:jsapp', 'uglify']);
  grunt.registerTask('build:css',   ['concat:csslib', 'concat:cssapp', 'autoprefixer', 'csscomb', 'csso', 'copy:css']);
  grunt.registerTask('build:font',  ['copy:font']);
  grunt.registerTask('build',       ['build:js', 'build:css', 'build:font']);
};