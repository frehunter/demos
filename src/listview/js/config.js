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
        ngWinJS: 'lib/angular-winjs/angular-winjs',
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
        ngWinJS: {
            deps: ['//Microsoft.WinJS.2.0/js/base.js', '//Microsoft.WinJS.2.0/js/ui.js', 'css!//Microsoft.WinJS.2.0/css/ui-dark.css', 'angular'],
        },
        ngGrid: {
            deps: ['jQuery', 'angular'],
        },
    }
});

