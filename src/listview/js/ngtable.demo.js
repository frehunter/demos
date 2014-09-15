'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'ngRoute', 'ngTable'], function (angular) {
    function buildUpTemplate(controllers) {
        var stringBuilder = [];

        for (var i in controllers) {
            stringBuilder.push('<div ng-controller="' + controllers[i] + '"><div>{{title}}</div><div><button ng-repeat="command in commands" ng-click="command.command()">{{command.name}}</button></div><div ng-include="\'' + controllers[i] + 'Template.html\'"></div></div>');
        }

        return stringBuilder.join('\r');
    }

    var testData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}
    ];

    var app = angular.module('ngTableDemoApp', ['ngRoute', 'ngTable']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/selection',
        {
            templateUrl: 'selection.html',
            controller: 'containerController'
        })
        .when('/template',
        {
            templateUrl: 'template.html',
            controller: 'containerController'
        })
        .when('/datasource',
        {
            templateUrl: 'datasource.html',
            controller: 'containerController'
        })
        .when('/inlineeditor',
        {
            templateUrl: 'inlineeditor.html',
            controller: 'containerController'
        });
    }]);

    app.controller('containerController', function($scope) {
    });

    app.controller('singleSelectionController', function($scope, $templateCache, ngTableParams) {
        $templateCache.put('singleSelectionControllerTemplate.html', '<table ng-table="tableParams" class="table ng-table-responsive"><tr ng-repeat="user in $data" ng-click="changeSelection(user)" ng-class="{\'active\': user.$selected}"><td data-title="\'Name\'">{{user.name}}</td><td data-title="\'Age\'">{{user.age}}</td></tr></table>');
        $scope.testData = JSON.parse(JSON.stringify(testData));
        $scope.title = 'Single selection';
        $scope.changeSelection = function(user) {
            for (var i in $scope.testData) {
                $scope.testData[i].$selected = false;
            }

            user.$selected = !user.$selected;
        };
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: $scope.testData.length,
        }, {
            total: $scope.testData.length,
            counts: [],
            getData: function($defer, params) {
                $defer.resolve($scope.testData);
            }
        });
    });

    app.controller('multipleSelectionController', function($scope, $templateCache, ngTableParams) {
        $templateCache.put('multipleSelectionControllerTemplate.html', '<table ng-table="tableParams" class="table ng-table-responsive"><tr ng-repeat="user in $data" ng-click="changeSelection(user)" ng-class="{\'active\': user.$selected}"><td data-title="\'Name\'">{{user.name}}</td><td data-title="\'Age\'">{{user.age}}</td></tr></table>');
        $scope.testData = JSON.parse(JSON.stringify(testData));
        $scope.title = 'Multiple selection';
        $scope.changeSelection = function(user) {
            user.$selected = !user.$selected;
        };
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: $scope.testData.length,
        }, {
            total: $scope.testData.length,
            counts: [],
            getData: function($defer, params) {
                $defer.resolve($scope.testData);
            }
        });
    });

    app.controller('selectFirstRowSelectionController', function($scope, $templateCache, ngTableParams) {
        $templateCache.put('selectFirstRowSelectionControllerTemplate.html', '<table ng-table="tableParams" class="table ng-table-responsive"><tr ng-repeat="user in $data" ng-click="changeSelection(user)" ng-class="{\'active\': user.$selected}"><td data-title="\'Name\'">{{user.name}}</td><td data-title="\'Age\'">{{user.age}}</td></tr></table>');
        $scope.testData = JSON.parse(JSON.stringify(testData));
        $scope.title = 'Select first row';
        $scope.commands = [
            {
                name: 'select first row',
                command: function () {
                    $scope.changeSelection($scope.testData[0]);
                },
            },
        ];
        $scope.changeSelection = function(user) {
            for (var i in $scope.testData) {
                $scope.testData[i].$selected = false;
            }

            user.$selected = !user.$selected;
        };
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: $scope.testData.length,
        }, {
            total: $scope.testData.length,
            counts: [],
            getData: function($defer, params) {
                $defer.resolve($scope.testData);
            }
        });
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('selection.html', buildUpTemplate(['singleSelectionController', 'multipleSelectionController', 'selectFirstRowSelectionController']));
    }]);

    app.controller('cellTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Cell template';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age', cellTemplate: '<div class="ngCellText"><input value="{{row.getProperty(col.field)}}"></input></div>'}]
        };
    });

    app.controller('rowTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Row template';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            rowHeight: 90,
            rowTemplate:'<div style="height: 100%" ng-style="{ \'cursor\': row.cursor }"><div ng-repeat="col in renderedColumns">{{row.getProperty(col.field)}}</div><button ng-click="row.entity.name = row.entity.name + \' - changed\'">change</button><button ng-click="$parent.testData=[]">remove</button></div>'
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('template.html', buildUpTemplate(['cellTemplateController', 'rowTemplateController']));
    }]);

    app.controller('modifyController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Modify data source';
        $scope.commands = [
            {
                name: 'modify first row',
                command: function () {
                    $scope.testData[0].name = 'changed';
                },
            },
            {
                name: 'remove first row',
                command: function () {
                    $scope.testData.splice(0, 1);
                },
            },
            {
                name: 'add first row',
                command: function () {
                    $scope.testData.unshift({ name: 'Ricky', age: 25 });
                },
            },
        ];
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('datasource.html', buildUpTemplate(['modifyController']));
    }]);

    app.controller('simpleInlineEditorController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'edit cell';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: 'Name', enableCellEdit: true},
                {field:'age', displayName:'Age', enableCellEdit: true}
            ]
        };
    });

    app.controller('focusInlineEditorController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'edit cell on focus';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                {field: 'name', displayName: 'Name', enableCellEdit: true},
                {field:'age', displayName:'Age', enableCellEdit: true}
            ]
        };
    });

    app.controller('templateInlineEditorController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'edit cell with template';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: 'Name', enableCellEdit: true, editableCellTemplate: '<input type="checkbox">Hello, world</input>' },
                {field:'age', displayName:'Age', enableCellEdit: true}
            ]
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('inlineeditor.html', buildUpTemplate(['simpleInlineEditorController', 'focusInlineEditorController', 'templateInlineEditorController']));
    }]);

    angular.bootstrap(document, ['ngTableDemoApp']);
});

