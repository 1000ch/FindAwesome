module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      jslib: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/fastclick/lib/fastclick.js'
        ],
        dest: 'public/js/lib.js'
      },
      jsapp: {
        src: [
          'public/js/index.js'
        ],
        dest: 'public/js/app.js'
      },
      cssapp: {
        src: [
          'node_modules/normalize.css/normalize.css'
        ],
        dest: 'public/css/app.css'
      }
    },
    uglify: {
      lib: {
        files: {
          'public/js/lib.min.js': 'public/js/lib.js',
          'public/js/app.min.js': 'public/js/app.js'
        }
      }
    },
    csscomb: {
      cssapp: {
        files: {
          'public/css/app.css': 'public/css/app.css'
        }
      }
    },
    csso: {
      cssapp: {
        files: {
          'public/css/app.min.css': 'public/css/app.css'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('build', ['concat', 'uglify', 'csscomb', 'csso']);
};