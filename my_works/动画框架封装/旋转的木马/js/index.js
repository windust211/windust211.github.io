 var config = [{
         "width": 400,
         "top": 20,
         "left": 50,
         "opacity": 0.2,
         "zIndex": 2
     }, //0
     {
         "width": 600,
         "top": 70,
         "left": 0,
         "opacity": 0.8,
         "zIndex": 3
     }, //1
     {
         "width": 800,
         "top": 100,
         "left": 200,
         "opacity": 1,
         "zIndex": 4
     }, //2
     {
         width: 600,
         top: 70,
         left: 600,
         opacity: 0.8,
         zIndex: 3
     }, //3
     {
         "width": 400,
         "top": 20,
         "left": 750,
         "opacity": 0.2,
         "zIndex": 2
     } //4
 ]; //其实就是一个配置单 规定了每张图片的大小位置层级透明度
 window.onload = function() {
     var oBtnLeft = document.getElementById('arrows').getElementsByTagName('a')[0];
     var oBtnRight = document.getElementById('arrows').getElementsByTagName('a')[1];
     var arrows = document.getElementById('arrows');
     var slider = document.getElementById('slider');
     var aLi = document.getElementsByTagName('li');
     var flag = true;
     slider.onmouseover = function() {
         animate(arrows, {
             'opacity': 1
         })
     }
     slider.onmouseout = function() {
         animate(arrows, {
             'opacity': 0
         })
     }
     // 根据配置单，动态排列；
     toAnimate(aLi);
     // 左方向点击；
     oBtnLeft.onclick = function() {
        if(flag){
            flag = false;
            config.push(config.shift());
            toAnimate(aLi);
        }
     }
     // 右方向点击；
     oBtnRight.onclick = function (){
        if(flag){
            flag = false;
            config.unshift(config.pop());
            toAnimate(aLi);
        }
     }

// 动画执行,跨作用域不能修改值；
    function toAnimate(objArr) {
       for (var i = 0; i < objArr.length; i++) {
            animate(objArr[i], {
             'width': config[i].width,
             'top': config[i].top,
             'left': config[i].left,
             'opacity': config[i].opacity,
             'zIndex': config[i].zIndex
            },function (){flag =  true})
         }
    }
 }


