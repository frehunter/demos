'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'ngRoute', 'ngGrid'], function (angular) {
    function buildUpTemplate(controllers) {
        var stringBuilder = [];

        for (var i in controllers) {
            stringBuilder.push('<div ng-controller="' + controllers[i] + '"><div><h1>{{title}}</h1></div><div><button ng-repeat="command in commands" ng-click="command.command()">{{command.name}}</button></div><div class="gridStyle" ng-grid="gridOptions"></div></div>');
        }

        return stringBuilder.join('\r');
    }

    var testData = [
            { Stage: 'Done', Waiting: 'Rachel Falzone', Requestor: 'Todd The Builder', 'ActiveDays': 3, StartDate: '2 days ago', Action: 'Poke' },
            { Stage: 'Done', Waiting: 'Rachel Falzone', Requestor: 'Todd The Builder', 'ActiveDays': 4, StartDate: '2 days ago', Action: 'Poke' },
    ];

    var app = angular.module('approvalApp', ['ngRoute', 'ngGrid']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/',
        {
            templateUrl: 'default.html',
            controller: 'containerController'
        });
    }]);

    app.controller('containerController', function($scope) {
    });

    app.controller('approvalController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Single selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            rowHeight: 25,
            headerRowHeight: 25,
            columnDefs: [
                { field: 'Stage', displayName: 'Stage' },
                { field:'Waiting', displayName:'Waiting for approval from' },
                { field: 'Requestor', displayName: 'Requested by' },
                { field: 'ActiveDays', displayName: 'Days Active' },
                { field: 'StartDate', displayName: 'Start Date' },
                {
                    field: 'Action',
                    displayName: 'Action',
                    cellTemplate: '<div class="ngCellText rightAlign clickable">{{row.getProperty(col.field)}}</div>',
                    headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText rightAlign">{{col.displayName}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div><div class="ngSortPriority">{{col.sortPriority}}</div><div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                },
            ]
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('default.html', buildUpTemplate(['approvalController']));
    }]);

    angular.bootstrap(document, ['approvalApp']);
});

