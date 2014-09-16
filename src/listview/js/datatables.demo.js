'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['jQuery', 'angular', 'datatables', 'ngRoute'], function ($, angular) {
    function buildUpTemplate(controllers) {
        var stringBuilder = [];

        for (var i in controllers) {
            stringBuilder.push('<div ng-controller="' + controllers[i] + '"><div><h1>{{title}}</h1></div><div><button ng-repeat="command in commands" ng-click="command.command()">{{command.name}}</button></div><div ng-include="\'' + controllers[i] + 'Template.html\'"></div></div>');
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

    var app = angular.module('ngDataTablesDemoApp', ['ngRoute']);

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

    app.directive('ngDatatables', function() {
        return {
            link: function (scope, element, attr) {
                var table;

                scope.table = table = element.DataTable(scope.$eval(attr['ngDatatables']));
                $.each(scope.testData, function (i, data) { table.row.add([data.name, data.age]).draw(); });
            }
        };
    });

    app.controller('singleSelectionController', function($scope, $templateCache) {
        $templateCache.put('singleSelectionControllerTemplate.html', '<table ng-datatables="options" class="display" cellspacing="0" style="width: 400px"><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody></table>');
        $scope.testData = JSON.parse(JSON.stringify(testData));
        $scope.title = 'Single selection';
        $scope.options = {
            paging: false,
            searching: false,
            info: false,
        };
        $scope.changeSelection = function(data) {
            for (var i in $scope.testData) {
                $scope.testData[i].$selected = false;
            }

            data.$selected = !data.$selected;
        };
    });

    app.controller('multipleSelectionController', function($scope, $templateCache, ngTableParams) {
        $templateCache.put('singleSelectionControllerTemplate.html', '<table ng-datatables="options" class="display" cellspacing="0" style="width: 400px"><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody></table>');
        $scope.testData = JSON.parse(JSON.stringify(testData));
        $scope.title = 'Multiple selection';
        $scope.options = {
            paging: false,
            searching: false,
            info: false,
        };
        $scope.changeSelection = function(data) {
            data.$selected = !data.$selected;
        };
    });

    app.controller('selectFirstRowSelectionController', function($scope, $templateCache, ngTableParams) {
        $templateCache.put('singleSelectionControllerTemplate.html', '<table ng-datatables="options" class="display" cellspacing="0" style="width: 400px"><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody></table>');
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
        $scope.options = {
            paging: false,
            searching: false,
            info: false,
        };
        $scope.changeSelection = function(data) {
            for (var i in $scope.testData) {
                $scope.testData[i].$selected = false;
            }

            data.$selected = !data.$selected;
        };
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

    angular.bootstrap(document, ['ngDataTablesDemoApp']);
});

