module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      jslib: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/jdataview/dist/browser/jdataview.js',
          'bower_components/ttf.js/src/ttf.js'
        ],
        dest: 'public/js/lib.js'
      },
      jsapp: {
        src: [
          'public/js/modules/canvas.js',
          'public/js/main.js'
        ],
        dest: 'public/js/app.js'
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
        files: ['<%=concat.jsapp.src%>'],
        tasks: ['concat:jsapp', 'uglify:jsapp']
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('build:js',    ['concat:jslib', 'concat:jsapp', 'uglify']);
  grunt.registerTask('build:css',   ['concat:csslib', 'concat:cssapp', 'autoprefixer', 'csscomb', 'csso']);
  grunt.registerTask('build:font',  ['copy']);
  grunt.registerTask('build',       ['build:js', 'build:css', 'build:font']);
};