module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    var projects = grunt.file.expand('src/*/Gruntfile.js');
    var prepareTasks = [];
    var defaultTasks = [];

    grunt.task.registerMultiTask('setBase', function () {
        grunt.file.setBase(this.data.base);
    });

    for (var index in projects) {
        var name = path.basename(path.dirname(projects[index]));
        grunt.config.set(['shell', name + '.prepare', 'command'], ['npm install', 'grunt prepare'].join('&'));
        grunt.config.set(['shell', name + '.default', 'command'], 'grunt');
        grunt.config.set(['npm-install', name], {});
        grunt.config.set(['setBase', name, 'base'], 'src/' + name);

        prepareTasks.push('setBase:' + name);
        prepareTasks.push('shell:' + name + '.prepare');

        defaultTasks.push('setBase:' + name);
        defaultTasks.push('shell:' + name + '.default');
    }

    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('prepare', prepareTasks);
};

