/**
 * 启动倒计时动画动画
 * @param {number} num 倒计时时间
 */
function starCountDown(num) {
  var startA = function () {
    if (num > 1) {
      console.log(num)
      document.querySelector(".start_box span").innerHTML = num--
      setTimeout(function () { startA(num) }, 1000);
    } else {
      document.querySelector(".start_box span").innerHTML = num--
      setTimeout(function () {
        var node = document.querySelector(".start_box")
        node.parentNode.removeChild(node);
      }, 1000);
      addRE() // 启动红包动画
    }
  }
  startA(num);
}

/**
 * 生成随机数
 * @param {number} startNum 
 * @param {number} endNum 
 */
function randomNumForRE(startNum, endNum) {
  return parseInt(Math.random() * ((endNum + 1) - startNum) + startNum);
}

/**
 * 向屏幕中添加红包
 */

var addRE = (function () {
  var domPool = []
  var timmer = null
  var numsOfHb = 0;
  var ranWidth = 50; // 用来设置红包的宽度。
  var wid = parseInt(document.querySelector(".redpack_box").offsetWidth) - ranWidth; // 流出红包与屏幕右边的间距

  return function addRE() {
    var ranLeft = randomNumForRE(0, wid); //用来设置红包的left值。与屏幕左侧的间距
    var ranRotate = randomNumForRE(-45, 45); //设置红包的rotate值。


    if (domPool.length < 20) {
      var redpackHTML = "<li class='reAnimation li" + numsOfHb + "'>" +
        "<a href='javascript: void(0);'>" +
        "<img src='img/hb_2.png'></a></li>";
      document.querySelector(".redpack_box").insertAdjacentHTML('beforeend', redpackHTML)
      var tempDom = document.querySelector(".li" + numsOfHb)
      numsOfHb++;
      tempDom.style.setProperty('left', ranLeft + 'px');
      var imgDom = tempDom.querySelector("img")
      imgDom.style.setProperty('width', ranWidth + 'px');
      imgDom.style.setProperty('transform', "rotate(" + ranRotate + "deg)");

      domPool.push(tempDom)
      clearTimeout(timmer)
      timmer = setTimeout(addRE, 250); // 红包密度，红包速度在css里调整
    } else {
      setTimeout(function () {
        var tempDom = domPool.shift() // shift + push 实现 queue队列，性能比unshift+pop好。
        tempDom.style.setProperty('left', randomNumForRE(0, wid) + 'px');
        tempDom.querySelector("img").style.setProperty('transform', "rotate(" + randomNumForRE(-45, 45) + "deg)");
        domPool.push(tempDom)
      }, 5000)
      clearTimeout(timmer)
      timmer = setTimeout(addRE, 250); // 红包密度，红包速度在css里调整
    }
  }
})()

// 委托处理红包点击事件
document.querySelector(".redpack_box").addEventListener('click', function (e) {
  console.log(e)
  console.log(e.target.tagName)
  if (e.target.tagName === 'IMG' || e.target.tagName === 'LI') {
    document.querySelector(".pop_box").style.setProperty("display", "block")
  }
})

document.querySelector(".pop_con a").addEventListener('click', function () {
  document.querySelector(".pop_box").style.setProperty("display", "none")
})

window.onload = function () {
  starCountDown(3);
}