 		function animate(obj,json,fn){
			clearInterval(obj.timer);
			obj.timer = setInterval(function (){
				var flag = true;
				for(var k in json){
					var leader = parseInt(getStyle(obj,k)) || 0;
					var target = json[k];
					var step = 0;
					// if(k === 'opacity'){
					// 	leader = getStyle(obj,k) * 100;
					// 	target *=100;
					// 	step =  target - leader > 0 ? Math.ceil((target - leader) /10) : Math.floor((target-leader)/10);
					// 	leader+= step;
					// 	obj.style[k] = leader/100;
					// } else if(k === 'zIndex'){
					// 	obj.style[k] = leader;
					// } else {
					// 	step =  target - leader > 0 ? Math.ceil((target - leader) /10) : Math.floor((target-leader)/10);
					// 	leader+= step;
					// 	obj.style[k] = leader+'px';
					// }
					switch(k){
						case 'opacity' :
							leader = getStyle(obj,k) * 100;
							target *=100;
							step =  target - leader > 0 ? Math.ceil((target - leader) /10) : Math.floor((target-leader)/10);
							leader+= step;
							obj.style[k] = leader/100;
							break;
						case 'zIndex' :
							obj.style[k] = target;
							break;
						default :
							step =  target - leader > 0 ? Math.ceil((target - leader) /10) : Math.floor((target-leader)/10);
							leader+= step;
							obj.style[k] = leader+'px';
					}
					if(target !== leader){
						flag = false;
					}
				}
				if(flag){
						clearInterval(obj.timer);
						if (typeof fn ==='function'){
							fn();
						}
					};
			},15)
		}

		function getStyle(obj,attr) {
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];

		}