require.config({
    baseUrl: 'js',
    paths: {
        ngGrid: 'lib/ng-grid/ng-grid',
        jQuery: 'lib/jquery/jquery',
        angular: 'lib/angular/angular',
        ngRoute: 'lib/angular-route/angular-route',
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

