require.config({
    baseUrl: 'scripts',
    paths: {
        ngGrid: 'lib/ng-grid/ng-grid',
        jQuery: 'lib/jquery/jquery',
        angular: 'lib/angular/angular',
    },
    shim: {
        angular: {
            deps: [ 'jQuery'],
            exports: 'angular',
        },
        ngGrid: {
            deps: ['jQuery', 'angular'],
        },
    }
});

