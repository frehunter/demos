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
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
    ];

    var app = angular.module('ngGridDemoApp', ['ngRoute', 'ngGrid']);

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
        })
        .when('/filter',
        {
            templateUrl: 'filter.html',
            controller: 'containerController'
        })
        .when('/column',
        {
            templateUrl: 'column.html',
            controller: 'containerController'
        });
    }]);

    app.controller('containerController', function($scope) {
    });

    app.controller('singleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Single selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
        };
    });

    app.controller('multipleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Multiple selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: true,
        };
    });

    app.controller('cellSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Cell selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
        };
    });

    app.controller('selectFirstRowSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Select first row';
        $scope.commands = [
            {
                name: 'select first row',
                command: function () {
                    $scope.gridOptions.selectRow(0, true);
                },
            },
        ];
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('selection.html', buildUpTemplate(['singleSelectionController', 'multipleSelectionController', 'cellSelectionController', 'selectFirstRowSelectionController']));
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

    app.controller('filterController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'built-in filter';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            filterOptions: {
                filterText: '',
                useExternalFilter: false,
            },
            enableFiltering: true,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age'}
            ]
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('filter.html', buildUpTemplate(['filterController']));
    }]);

    app.controller('sortController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'sort';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableSorting: true,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age'}
            ]
        };
    });

    app.controller('resizeController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'resize';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableColumnResize: true,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age'}
            ]
        };
    });

    app.controller('reorderController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'reorder';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableColumnReordering: true,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age'}
            ]
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('column.html', buildUpTemplate(['sortController', 'resizeController', 'reorderController']));
    }]);

    angular.bootstrap(document, ['ngGridDemoApp']);
});

