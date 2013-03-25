module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      spec: {
        src: 'test/spec/*.js',
        dest: 'test/spec.js'
      }
    },
    shell: {
      runSpec: {
        command: 'open -a "Google Chrome.app" test/index.html'
      }
    },
    uglify: {
      options: {
        banner: [
          '/*!',
          '',
          '<%= pkg.name %> - <%= pkg.description %>',
          'Author: <%= pkg.author  %>',
          '',
          '*/',
          ''
          ].join('\n')
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      spec: {
        files: ['test/spec/*.js'],
        tasks: ['concat']
      },
      src: {
        files: ['src/*.js'],
        tasks: ['default', 'shell:runSpec']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};