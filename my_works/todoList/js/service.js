;
(function(angular) {
	var app = angular.module('service', []);
	app.service('MyService', ['$window',
		function($window) {
			//  get datas from local cache
			// get data from local storage for initializition;
			var str = $window.localStorage.getItem('myTodos') || '[]';
			var todos = JSON.parse(str);
			// get
			this.get = function() {
				return todos;
			};
			// set
			this.set = function(item, val) {
				$window.localStorage.setItem(item, val)
			}
			//  add
			this.add = function(ctx) {
				if (!ctx.newTodo) {
					return;
				}
				todos.push({
					id: Math.random(),
					name: ctx.newTodo,
					completed: false
				});
				// $window.localStorage.setItem('myTodos', angular.toJson(todos));
				this.set('myTodos', angular.toJson(todos));
				ctx.newTodo = '';
			};

			//   edit
			this.edit = function(ctx, id) {
				ctx.isEditingId = id;
			};
			//  save
			this.save = function(ctx) {
				ctx.isEditingId = -1;
				this.set('myTodos', angular.toJson(todos));
			};
			//  remove tasks;
			this.remove = function(ctx, id) {
				for (var i = 0; i < todos.length; i++) {
					var items = todos[i];
					if (items.id == id) {
						todos.splice(i, 1);
						//  re-store the data;
						this.set('myTodos', angular.toJson(todos));
					}
				}
			};
			//  toggle status
			this.toggleAll = function(ctx) {
				for (var i = 0; i < todos.length; i++) {
					todos[i].completed = ctx.selectAll;
				}
			};

			//  clear all completed;
			this.clearAll = function(ctx) {
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].completed) {
						//  every slice will reduce i, or it will be jumped over;
						todos.splice(i, 1);
						i--;
					}
				}
				//  reset localStorage;
				this.set('myTodos', angular.toJson(todos));;
			};
			//   count the tasks unfinished;
			this.getActive = function() {
				var count = 0;
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].completed === false) {
						count++;
					}
				}
				return count;
			};

			//  user filter
			//  active
			this.active = function(ctx) {
				ctx.isCompleted = {
					completed: false
				};
			};
			//  completed
			this.completed = function(ctx) {
				ctx.isCompleted = {
					completed: true
				}
			};
			// all
			this.all = function(ctx) {
				ctx.isCompleted = '';
			};
		}
	]);
})(angular);