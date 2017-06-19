/**
 * @Author:      Jacky
 * @DateTime:    2016-11-14 14:11:33
 * @Description: 猜数字游戏的简单实现；
 **/
 /**
  * @Author:      Jacky
  * @DateTime:    2016-11-14 14:12:13
  * @Description:
  **/
      var oBtn = document.getElementsByTagName('button')[0];
      var oBtnNextStage = document.getElementsByTagName('button')[1];
      var oHint = document.getElementsByTagName('p')[0];
      var oInput = document.getElementsByTagName('input')[0];
      var oStage = document.getElementsByTagName('h2')[0];
      var iStage = 1;
      var randNum = 0;
      var init = true;
      var count = 0;
      var total = 10;
      var numBig,numSmall;
      oBtnNextStage.onclick = function (){
        if(this.innerHTML == '下一关'){
            iStage++;
            oStage.innerHTML = '第' + iStage + '关';
            total --;
         } else {
          if(this.innerHTML == '再试一次？'){
            this.innerHTML = '下一关';
          }
         }
         oInput.focus();
        init = true;
        initGame();
      } ;
      initGame();
      oBtn.onclick = startToGuess;
      function initGame(){
        if(init){
          oInput.focus();
          oBtnNextStage.disabled = true;
          oInput.value = '';
          oInput.disabled = false;
          oBtn.disabled = false;
          numBig = 100;
          numSmall = 0;
          oHint.innerHTML = '游戏开始咯！';
          init = false;
          count = total;
          // to get a number ranging from 1 to 100;
          randNum = Math.floor(Math.random()*100)+1;
          console.log(randNum);
        }
      }

     function startToGuess (){
        if(/[0-9]/.test(oInput.value)){
          var num = Number(oInput.value);
          if(num >= numBig || num <= numSmall){
            debugger;
            alert('别瞎写好不，有范围滴');
            oInput.value = '';
              oInput.focus();
            return;
          }
          switch(true){
            case  + (oInput.value) == randNum :
              passed();
              break;
            case  oInput.value > randNum :
                numBig = oInput.value < numBig ? oInput.value : numBig;
                failed('大了');
                break;
            case oInput.value < randNum :
                numSmall = oInput.value > numSmall ? oInput.value : numSmall;
                failed('小了');
                break;
            default:
              break;
          }
        } else{
          alert('请输入数字！');
          oInput.value = '';
        }
      }

      function passed(){
        oInput.value = '正确！';
        oHint.innerHTML = '恭喜通关';
        oInput.disabled = true;
        oBtn.disabled = true;
        oBtnNextStage.disabled = false;
      }

      function failed(msn){
         count--;
        if(count == 0){
          oHint.innerHTML = 'GAME OVER!';
          oInput.disabled = true;
          oBtn.disabled = true;
          oBtnNextStage.innerHTML = '再试一次？';
          oBtnNextStage.disabled = false;
        } else{
          oHint.innerHTML = '我去，' + msn + '哦！'+'还剩下'+ count + '次机会('+ scopeHint(numSmall,numBig) +')';
          oInput.value = '';
          oInput.focus();
        }
      }

      function scopeHint(numSmall,numBig){
        return numSmall + ' - ' + numBig;
      }
      oInput.onkeydown = function (ev){
        var ev = ev || window.event;
        if(ev.keyCode ==13) {
          oBtn.onclick();
        }
      }