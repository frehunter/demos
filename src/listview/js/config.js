require.config({
    '*': {
        'css': 'requirecss' // or whatever the path to require-css is
    },
    baseUrl: 'js',
    paths: {
        ngGrid: 'lib/ng-grid/ng-grid',
        jQuery: 'lib/jquery/jquery',
        angular: 'lib/angular/angular',
        ngRoute: 'lib/angular-route/angular-route',
        requirecss: 'lib/require-css/css.js',
    },
    shim: {
        angular: {
            deps: [],
            exports: 'angular',
        },
        ngRoute: {
            deps: ['angular'],
        },
        ngGrid: {
            deps: ['jQuery', 'angular'],
        },
    }
});

