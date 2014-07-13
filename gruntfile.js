module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      lib: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/fastclick/lib/fastclick.js'
        ],
        dest: 'public/js/lib.js'
      }
    },
    uglify: {
      lib: {
        files: {
          'public/js/lib.min.js': 'public/js/lib.js'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat', 'uglify']);
};