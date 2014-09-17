require.config({
    '*': {
        'css': 'css' // or whatever the path to require-css is
    },
    baseUrl: 'js',
    paths: {
        jQuery: 'lib/jquery/jquery',
        ngGrid: 'lib/ng-grid/ng-grid',
        ngTable: 'lib/ng-table/ng-table',
        angular: 'lib/angular/angular',
        ngRoute: 'lib/angular-route/angular-route',
        css: 'lib/require-css/css',
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
        ngTable: {
            deps: ['angular', 'css!lib/ng-table/ng-table.css'],
        },
    }
});

