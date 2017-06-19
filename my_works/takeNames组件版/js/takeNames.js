// 保存名字
var names = ['Lily', 'Lucy', 'Tom', 'Tommy', 'Sam', 'Sammy', 'luke', 'Alice', 'Jim', 'Jimmy', 'Edsion', 'Roy', 'Joy', 'June', 'Sun', 'Sunny', 'Stone', 'Lee', 'Steve', 'Steven', 'Sally', 'Belly', 'Bunny', 'Jasmine', 'Alina', 'Ella', 'Selina', 'Tella', 'May', 'Helen', 'Ann', 'April', 'Cindy', 'Cathy', 'Cherry', 'Sherry', 'Chris', 'Cora', 'Dona', 'Anny', 'Leo', 'Frank', 'Frankie', 'Eve', 'Eva', 'Fanny', 'Jack', 'Jackie'];
// 为避免全局污染，写成面向对象形式，写成变量形式；
var takingName = {
	timer: null,
	init: function(names) {
		var box = document.getElementsByClassName('take-name-box')[0];
		if (box) {
			var newBtn = document.createElement('button');
			var oDiv = document.createElement('div');
			oDiv.className = 'take-name';
			oDiv.innerHTML = '<p>开始点名</p>';
			newBtn.innerHTML = '开始';
			box.appendChild(oDiv);
			box.appendChild(newBtn);
			this.toTakeNames(names);
		}
	},
	toTakeNames: function(names) {
		var self = this;
		var rand = 0;
		var oBtn = document.getElementsByTagName('button')[0];
		var msn = document.getElementsByTagName('p')[0];
		var oDiv = document.getElementsByTagName('div')[0];
		oBtn.onclick = function() {
			// 修改this指向，并进行传参；
			var that = this;
			self.toStartOrPause(msn, that, names);
		};
	},
	toStartOrPause: function(msn, that, names) {
		if (that.innerHTML === '开始') {
			that.innerHTML = '停止';
			this.takeNames(msn, names);
		} else {
			that.innerHTML = '开始';
			clearInterval(takingName.timer);
		}
	},
	takeNames: function(msn, names) {

		var that = this;
		this.timer = setInterval(function() {
			// 生成0到57随机数
			rand = Math.floor(Math.random() * (names.length - 1)) + 1;
			msn.innerHTML = names[rand - 1];
		}, 200)
	}
};
// // 封装完毕，进行调用；
takingName.init(names);