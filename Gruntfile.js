module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    var projects = grunt.file.expand('src/*/Gruntfile.js');
    var defaultTasks = [];

    for (var index in projects) {
        var name = path.basename(path.dirname(projects[index]));
        grunt.config.set(['shell', name, 'command'], 'grunt --gruntfile ' + projects[index]);
        defaultTasks.push('shell:' + name);
    }

    grunt.registerTask('default', defaultTasks);
};

