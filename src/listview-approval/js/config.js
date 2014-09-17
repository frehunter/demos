require.config({
    '*': {
        'css': 'css' // or whatever the path to require-css is
    },
    baseUrl: 'js',
    paths: {
        jQuery: 'lib/jquery/jquery',
        ngGrid: 'lib/ng-grid/ng-grid',
        angular: 'lib/angular/angular',
        ngRoute: 'lib/angular-route/angular-route',
        css: 'lib/require-css/css',
    },
    shim: {
        jQuery: {
            exports: 'jQuery',
        },
        angular: {
            exports: 'angular',
        },
        ngRoute: {
            deps: ['angular'],
        },
        ngGrid: {
            deps: ['jQuery', 'angular', 'css!lib/ng-grid/ng-grid.css'],
        },
    }
});

