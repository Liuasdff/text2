// 设置文本内容的兼容代码

function mysetinnerText(id, text) {
  if (typeof id.textCentent == "undefined") {
    id.innerText = text;
  } else {
    id.textCentent = text;
  }
}

// 获取文本内容的兼容代码

function mygetinnerText(id) {
  if (typeof id.textCentent == "undefined") {
    return id.innerText;
  } else {
    return id.textContent;
  }
}

// 获取第一个子元素的兼容代码

function myfirstElementChild(id) {
  if (id.firstElementChild) {
    return id.firstElementChild;
  }
  // 可以直接用这个简单模式
  // else{
  //     return id.firstElementChild ;
  // }
  //     下面是严格模式
  else {
    var a = id.firstChild;
    while (a && id.firstChild.type != 1) {
      a = a.nextSibling;
      return a;
    }
  }
}

// 获取最后一个子元素的兼容代码
function mylastElementChild(id) {
  if (id.lastElementChild) {
    return id.lastElementChild;
  } else {
    var b = id.lastChild;
    while (b && id.lastChild.nodeType != 1) {
      b = b.previousSibling;
      return b;
    }
  }
}

// 为同一个元素添加多个事件的兼容代码
function myaddEventListener(element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fn);
  } else {
    element["on" + type] = fn;
  }
}

// 移除一个元的事件的兼容代码
function myremoveEventListener(element, type, 命名函数) {
  if (element.removeEventListener) {
    element.removeEventListener(type, 命名函数, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, 命名函数);
  } else {
    element["on" + type] = null;
  }
}


function mymaopao(e) {
  if (window.event) {
    window.event.cancelBubble = true;
  } else if (e.stopPropagation) {
    e.stopPropagation();
  }
}

// 封装动画的代码
function mydouhua(element, maxlength) {
  clearInterval(element.x);
  element.x = setInterval(function() {
    var dangqian = element.offsetLeft;
    var length = 1;
    if (Math.abs(maxlength - dangqian) > Math.abs(length)) {
      length = dangqian < maxlength ? length : -length;
      dangqian += length;
      element.style.left = dangqian + "px";
    } else {
      clearInterval(element.x);
      element.style.left = maxlength + "px";
    }
  }, 3)
}

// 终极动画封装1
function myzjdonghua1(element, json, fn) {
  clearInterval(element.x);
  element.x = setInterval(function() {
    var stp = true;
    for (var a in json) {
      var dangqian = parseInt(mycsshuoqu(element, a));
      var length = 1;
      if (Math.abs(json[a] - dangqian) > Math.abs(length)) {
        length = dangqian < json[a] ? length : -length;
        dangqian += length;
        element.style[a] = dangqian + "px";
        if (dangqian != json[a]) {
          stp = false;
        }
      } else {
        element.style[a] = json[a] + "px";
        dangqian = json[a];
        if (stp) {
          clearInterval(element.x);
          if (fn) {
            fn();
          }
        }

      }

    }

  }, 10)
}

// 终极动画封装
function myzjdonghua(element, json, fn) {
  clearInterval(element.x);
  element.x = setInterval(function() {
    var stp = true;
    for (var a in json) {
      if (a == "zIndex") {
        element.style[a] = json[a];
      } else if (a == "opacity") {
        var dangqian = mycsshuoqu(element, a) * 100;
        var leng = 1;
        leng = json[a] * 100 > dangqian ? leng : -leng;
        dangqian += leng;
        if (Math.abs(dangqian - json[a] * 100) > Math.abs(leng)) {
          element.style[a] = dangqian / 100;
          if (dangqian != json[a] * 100) {
            stp = false;
          }
        } else {
          element.style[a] = json[a];
        }
      } else {
        var dangqian = parseInt(mycsshuoqu(element, a));
        var leng = 1;
        leng = dangqian < json[a] ? leng : -leng;
        dangqian += leng;
        if (Math.abs(json[a] - dangqian) > Math.abs(leng)) {
          element.style[a] = dangqian + "px";
        } else {
          element.style[a] = json[a] + "px";
          dangqian = json[a];
        }
        if (dangqian != json[a]) {
          stp = false;
        }
      }
    }
    if (stp) {
      clearInterval(element.x);
      if (fn) {
        fn();
      }
    }

  }, 1)
}


// 封装浏览器可视区域的兼容代码
function myscroll() {
  return {
    left: parseInt(window.pageXOffset) || parseInt(document.documentElement.scrollLeft) ||
      parseInt(document.body.scrollLeft) || 0,
    top: parseInt(window.pageYOffset) || parseInt(document.documentElement.scrollTop) ||
      parseInt(document.body.scrollTop) || 0
  };
}

// 缓动动画
function myhuandong(element, shuxing, maxleng) {
  clearInterval(element.a);
  element.a = setInterval(function() {
    var dangqian = parseInt(mycsshuoqu(element, shuxing));
    var leng = (maxleng - dangqian) / 10;
    leng = maxleng - dangqian > 0 ? Math.ceil(leng) : Math.floor(leng);
    dangqian += leng;
    element.style[shuxing] = dangqian + "px";
    if (dangqian == maxleng) {
      clearInterval(element.a);
    }
    // console.log("当前:"+dangqian+"走的距离:"+leng);
  }, 10)
}

// 获取CSS标签中属性的值的兼容代码
function mycsshuoqu(element, shuxing) {
  return window.getComputedStyle ? parseInt(window.getComputedStyle(element, null)[shuxing]) :
    parseInt(element.currentStyle[shuxing]);
}

// 终极缓动动画的封装
function myzjhuandong(element, json, fn) {
  clearInterval(element.a);
  element.a = setInterval(function() {
    var stp = true;
    for (var shuxing in json) {
      if (shuxing == "opacity") {
        var dangqian = mycsshuoqu(element, shuxing) * 100;
        var b = json[shuxing] * 100;
        var leng = (b - dangqian) / 10;
        leng = b - dangqian > 0 ? Math.ceil(leng) : Math.floor(leng);
        dangqian += leng;
        dangqian = dangqian / 100;
        element.style[shuxing] = dangqian;
        if (dangqian != json[shuxing]) {
          stp = false;
        }
      } else if (shuxing === "zIndex") {
        element.style[shuxing] = json[shuxing];
      } else {
        var dangqian = parseInt(mycsshuoqu(element, shuxing));
        var leng = (json[shuxing] - dangqian) / 10;
        leng = json[shuxing] - dangqian > 0 ? Math.ceil(leng) : Math.floor(leng);
        dangqian += leng;
        element.style[shuxing] = dangqian + "px";
        if (dangqian != json[shuxing]) {
          stp = false;
        }
      }

    }
    if (stp) {
      clearInterval(element.a);
      if (fn) {
        fn();
      }
    }
    // console.log("当前:"+dangqian+"走的距离:"+leng);
  }, 10)
}

// 获取的兼容代码
myevt = {
  event: function(e) {
    return e || window.event;
  },
  clientX: function(e) {
    return this.event(e).clientX;
  },
  clientY: function(e) {
    return this.event(e).clientY;
  },
  scrollLeft: function() {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft ||
      0;
  },
  scrollTop: function() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop ||
      0;
  },
  pageX: function(e) {
    return this.event(e).pageX ? this.event(e).pageX : this.scrollLeft() + this.clientX(e);
  },
  pageY: function(e) {
    return this.event(e).pageY ? this.event(e).pageY : this.scrollTop() + this.clientY(e);
  }
};
// 设置的兼容代码
myevtset = {
  event: function(e) {
    return e || window.event;
  },
  clientX: function(e) {
    return this.event(e).clientX;
  },
  clientY: function(e) {
    return this.event(e).clientY;
  },
  scrollLeft: function(i) {
    if (document.documentElement.scrollLeft) {
      document.documentElement.scrollLeft = i
    } else if (document.body.scrollLeft) {
      document.body.scrollLeft = i
    }
  },
  scrollTop: function(i) {
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTop = i
    } else if (document.body.scrollTop) {
      document.body.scrollTop = i
    }
  },
  pageX: function(e) {
    return this.event(e).pageX ? this.event(e).pageX : this.scrollLeft() + this.clientX(e);
  },
  pageY: function(e) {
    return this.event(e).pageY ? this.event(e).pageY : this.scrollTop() + this.clientY(e);
  }
};

// 下拉条文字不被选中的兼容代码
function mygetSelection() {
  return window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}

function forcss(div, json) {
  for (var k in json) {
    div.style[k] = json[k]
  }
}

function confirm1(text1, text2, fn) {
  var body = document.getElementById('body')
  var div1 = document.createElement('div')
  // var top = myevt.scrollTop() + 20 + 'px'
  var json = {
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'position': 'fixed',
    'zIndex': 999,
    'backgroundColor': '#000',
    'opacity': 0.4,
  }
  forcss(div1, json)
  body.appendChild(div1)
  var div2 = document.createElement('div')
  var json = {
    'width': '100%',
    'height': '100%',
    // 'display': 'inlineBlock',
    'top': '20px',
    'left': 0,
    'position': 'absolute',
    'zIndex': 9999,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'paddingTop': '20px',
  }
  forcss(div2, json)
  body.appendChild(div2)
  var div2_1 = document.createElement('div')
  var json = {
    'display':'inline-block',
    'padding': '20px 20px',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'borderRadius': '5px',
    'position': 'absolute',
    'top': 0,
    'fontSize': '18px',
  }
  forcss(div2_1,json)
  // mysetinnerText(div2_1,text1)
  div2.appendChild(div2_1)

  var div2_1_1 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    'minWidth': '300px',
    'maxWidth': '800px',
    'backgroundColor': '#fff',
    'color':'blue',
  }
  forcss(div2_1_1, json)
  mysetinnerText(div2_1_1,text1)
  div2_1.appendChild(div2_1_1)

  var div2_1_2 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    // 'textAlign': 'center',
    'padding': '0px 20px',
    'backgroundColor': '#fff',
    'color':'red',
    'margin':'10px 0px 20px 0px',
  }
  forcss(div2_1_2, json)
  mysetinnerText(div2_1_2,text2)
  div2_1.appendChild(div2_1_2)

  var div2_1_3 = document.createElement('div')
  div2_1.appendChild(div2_1_3)


  var yes = document.createElement('button')
  var json = {
    // 'padding': '5px 15px',
    'backgroundColor': '#fd397a',
    'float': 'right',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(yes,json)
  mysetinnerText(yes,'确定')
  div2_1_3.appendChild(yes)
  yes.onclick = function() {
    if (fn) {
      fn()
    }
    body.removeChild(div1)
    body.removeChild(div2)
  }
  var no = document.createElement('button')
  var json = {
    'backgroundColor': '#26A2FF',
    'float': 'right',
    'marginRight': '15px',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(no, json)
  mysetinnerText(no,'取消')
  div2_1_3.appendChild(no)
  no.onclick = function() {
    body.removeChild(div1)
    body.removeChild(div2)
  }
}

function confirm2(text1, text2, fn) {
  var body = document.getElementById('body')
  var div1 = document.createElement('div')
   // var top = myevt.scrollTop() + 20 + 'px'
  var json = {
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'position': 'fixed',
    'zIndex': 999,
    'backgroundColor': '#000',
    'opacity': 0.4,
  }
  forcss(div1, json)
  body.appendChild(div1)
  var div2 = document.createElement('div')
  var json = {
    'width': '100%',
    'height': '100%',
    'top': '20px',
    'left': 0,
    'position': 'absolute',
    'zIndex': 9999,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'paddingTop': '20px',
  }
  forcss(div2, json)
  body.appendChild(div2)
  var div2_1 = document.createElement('div')
  var json = {
    'display':'inline-block',
    'padding': '20px 20px',
    'minWidth': '300px',
    'maxWidth': '800px',
    'backgroundColor': '#fff',
    'borderRadius': '5px',
    'position': 'absolute',
    'top': '20px',
    'fontSize': '18px',
  }
  forcss(div2_1,json)
  div2.appendChild(div2_1)

  var div2_1_1 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'color':'blue',
  }
  forcss(div2_1_1, json)
  mysetinnerText(div2_1_1,text1)
  div2_1.appendChild(div2_1_1)

  var div2_1_2 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    // 'textAlign': 'center',
    'padding': '0px 20px',
    'backgroundColor': '#fff',
    'color':'red',
    'margin':'10px 0px 20px 0px',
  }
  forcss(div2_1_2, json)
  mysetinnerText(div2_1_2,text2)
  div2_1.appendChild(div2_1_2)
  var div2_1_3 = document.createElement('div')
  div2_1.appendChild(div2_1_3)
  var yes = document.createElement('button')
  var json = {
    // 'padding': '5px 15px',
    'backgroundColor': '#fd397a',
    'float': 'right',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(yes,json)
  mysetinnerText(yes,'Confirm')
  div2_1_3.appendChild(yes)
  yes.onclick = function() {
    if (fn) {
      fn()
    }
    body.removeChild(div1)
    body.removeChild(div2)
  }
  var no = document.createElement('button')
  var json = {
    // 'padding': '5px 15px',
    'backgroundColor': '#26A2FF',
    'float': 'right',
    'marginRight': '15px',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(no, json)
  mysetinnerText(no,'Cancel')
  div2_1_3.appendChild(no)
  no.onclick = function() {
    body.removeChild(div1)
    body.removeChild(div2)
  }
}

function alert1(text) {
  var body = document.getElementById('body')
  var div1 = document.createElement('div')
  // var top = myevt.scrollTop() + 20 + 'px'
  var json = {
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'position': 'fixed',
    'zIndex': 999,
    'backgroundColor': '#000',
    'opacity': 0.4,
  }
  forcss(div1, json)
  body.appendChild(div1)
  var div2 = document.createElement('div')
  var json = {
    'width': '100%',
    'height': '100%',
    'top': '20px',
    'left': 0,
    'position': 'absolute',
    'zIndex': 9999,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'paddingTop': '20px',
  }
  forcss(div2, json)
  body.appendChild(div2)
  var div2_1 = document.createElement('div')
  var json = {
    'display':'inline-block',
    'padding': '20px 20px',
    'minWidth': '300px',
    'maxWidth': '600px',
    'backgroundColor': '#fff',
    'borderRadius': '5px',
    'position': 'absolute',
    'top': '0px',
    'fontSize': '18px',
  }
  forcss(div2_1,json)
  div2.appendChild(div2_1)
  var div2_1_0 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    // 'textAlign': 'center',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'color':'#26A2FF',
    'margin':'0px 0px 15px 0px',
  }
  forcss(div2_1_0, json)
  var text0 = '错误'
  mysetinnerText(div2_1_0,text0)
  div2_1.appendChild(div2_1_0)
  var div2_1_1 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    // 'textAlign': 'center',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'color':'red',
    'margin':'0px 0px 20px 0px',
  }
  forcss(div2_1_1, json)
  text = text.replace(/\:/g,": ");
  text = text[0].toUpperCase() + text.slice(1);
  mysetinnerText(div2_1_1,text)
  div2_1.appendChild(div2_1_1)
  var div2_1_2 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'textAlign': 'center',
    'color':'red',
    'margin':'20px 0px 0px 0px',
  }
  forcss(div2_1_2, json)
  div2_1.appendChild(div2_1_2)
  var ok = document.createElement('button')
  var json = {
    'backgroundColor': '#26A2FF',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(ok,json)
  mysetinnerText(ok,'确定')
  div2_1_2.appendChild(ok)
  ok.onclick = function() {
    body.removeChild(div1)
    body.removeChild(div2)
  }
}

function alert2(text) {
  var body = document.getElementById('body')
  var div1 = document.createElement('div')
  // var top = myevt.scrollTop() + 20 + 'px'
  var json = {
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'position': 'fixed',
    'zIndex': 999,
    'backgroundColor': '#000',
    'opacity': 0.4,
  }
  forcss(div1, json)
  body.appendChild(div1)
  var div2 = document.createElement('div')
  var json = {
    'width': '100%',
    'height': '100%',
    'top': '20px',
    'left': 0,
    'position': 'absolute',
    'zIndex': 9999,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'paddingTop': '20px',
  }
  forcss(div2, json)
  body.appendChild(div2)
  var div2_1 = document.createElement('div')
  var json = {
    'display':'inline-block',
    'padding': '20px 20px',
    'minWidth': '300px',
    'maxWidth': '600px',
    'backgroundColor': '#fff',
    'borderRadius': '5px',
    'position': 'absolute',
    'top': '0px',
    'fontSize': '18px',
  }
  forcss(div2_1,json)
  div2.appendChild(div2_1)
  var div2_1_0 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    // 'textAlign': 'center',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'color':'#26A2FF',
    'margin':'0px 0px 15px 0px',
  }
  forcss(div2_1_0, json)
  var text0 = 'Error'
  mysetinnerText(div2_1_0,text0)
  div2_1.appendChild(div2_1_0)
  var div2_1_1 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'padding': '0px 20px',
    // 'textAlign': 'center',
    'minWidth': '300px',
    'backgroundColor': '#fff',
    'color':'red',
    'margin':'0px 0px 20px 0px',
  }
  forcss(div2_1_1, json)
  text = text.replace(/\:/g,": ");
  text = text[0].toUpperCase() + text.slice(1);
  mysetinnerText(div2_1_1,text)
  div2_1.appendChild(div2_1_1)
  var div2_1_2 = document.createElement('div')
  var json = {
    'display':'inlineBlock',
    'textAlign': 'center',
    'color':'red',
    'margin':'20px 0px 0px 0px',
  }
  forcss(div2_1_2, json)
  div2_1.appendChild(div2_1_2)
  var ok = document.createElement('button')
  var json = {
    'backgroundColor': '#26A2FF',
    'fontSize': '18px',
    'height': '40px',
    'width': '100px',
  }
  forcss(ok,json)
  mysetinnerText(ok,'OK')
  div2_1_2.appendChild(ok)
  ok.onclick = function() {
    body.removeChild(div1)
    body.removeChild(div2)
  }
}
