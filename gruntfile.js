module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      lib: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/fastclick/lib/fastclick.js'
        ],
        dest: 'src/js/lib.js'
      }
    },
    uglify: {
      lib: {
        files: {
          'src/js/lib.min.js': 'src/js/lib.js'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat', 'uglify']);
};