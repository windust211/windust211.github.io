;
(function(angular) {
    'use strict'
    var app = angular.module('todosApp', ['service']);
    var app = app.controller('todosCtrl', ['$scope', 'MyService', '$window',
        function($scope, MyService, $window) {
            $scope.id = -1;
            // init
            $scope.todos = MyService.get();
            // use angular.toJson() and angular.fromJson() for data type convertion;
            // to add up new todos
            $scope.add = function() {
                MyService.add($scope)
            }
            //dblclick to edit and save
            // use input and label and connect them with ng-class and ng-modle;
            // toggle view and form;
            $scope.edit = function(id) {
                MyService.edit($scope, id)
            }
            // save
            $scope.save = function() {
                MyService.save($scope)
            };
            // remove tasks
            $scope.remove = function(id) {
                MyService.remove($scope, id)
            }
            // toggle status;
            $scope.toggleAll = function() {
                MyService.toggleAll($scope)
            };
            // clear all completed
            $scope.clearAll = function() {
                MyService.clearAll($scope);
            }
            // count the unfinished tasks;
            // don't reduct it or it will stuck in dead loop;
            //  this is forbidden;
            // $scope.getActive = MyService.getActive();
            $scope.getActive = function() {
                return MyService.getActive();
            }

            // use filter to do filtering instead of route
            // all,active,completed,
            $scope.active = function() {
                MyService.active($scope);
            }
            //  completed
            $scope.completed = function() {
                MyService.completed($scope);
            }
            // all
            $scope.all = function() {
                MyService.all($scope);
            }
        }
    ]);

})(angular)