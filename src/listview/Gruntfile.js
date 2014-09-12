module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    var buildDir = grunt.option('builddir') || 'build';
    var installDir = grunt.option('installdir') || 'install';

    grunt.initConfig({
        bower: {
            install: {
            }
        },
        copy: {
            install: {
                files: [
                    {expand: true, src: ['*.html', 'scripts/*.js'], dest: installDir, filter: 'isFile'},
                    {expand: true, src: ['lib/**/*'], dest: path.join(installDir, 'scripts'), filter: 'isFile'},
                ],
            },
        },
    });

    // A very basic default task.
    grunt.registerTask('prepare', ['bower:install']);
    grunt.registerTask('default', []);
    grunt.registerTask('install', ['copy:install']);
};

