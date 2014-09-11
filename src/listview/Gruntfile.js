module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bower: {
            install: {
            }
        }
    });

    // A very basic default task.
    grunt.registerTask('prepare', ['bower:install']);
    grunt.registerTask('default', []);
};

