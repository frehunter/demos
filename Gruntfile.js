module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    var projects = grunt.file.expand('src/*/Gruntfile.js');
    var prepareTasks = [];
    var defaultTasks = [];
    var installTasks = [];

    grunt.task.registerMultiTask('setBase', function () {
        grunt.file.setBase(this.data.base);
    });

    var buildDir = path.join(process.cwd(), grunt.option('builddir') || 'build');
    var installDir = path.join(process.cwd(), grunt.option('installdir') || 'install');

    for (var index in projects) {
        var name = path.basename(path.dirname(projects[index]));

        grunt.config.set(['shell', name + '.prepare', 'command'], ['npm install', 'grunt prepare'].join('&'));
        grunt.config.set(['shell', name + '.default', 'command'], 'grunt --builddir=' + path.join(buildDir, name) + ' --installdir=' + path.join(installDir, name));
        grunt.config.set(['shell', name + '.install', 'command'], 'grunt install --builddir=' + path.join(buildDir, name) + ' --installdir=' + path.join(installDir, name));
        grunt.config.set(['npm-install', name], {});
        grunt.config.set(['setBase', name, 'base'], 'src/' + name);

        prepareTasks.push('setBase:' + name);
        prepareTasks.push('shell:' + name + '.prepare');

        defaultTasks.push('setBase:' + name);
        defaultTasks.push('shell:' + name + '.default');

        installTasks.push('setBase:' + name);
        installTasks.push('shell:' + name + '.install');
    }

    grunt.registerTask('install', installTasks);
    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('prepare', prepareTasks);
};

