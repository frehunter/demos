module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bower: {
            install: {
            }
        }
    });

    // A very basic default task.
    grunt.registerTask('default', ['bower:install']);
};

