
my = {
  mousemoveobj : {"a":'b'},
  mouseupobj : {},
  resizeobj : {},
  mousemove : function(k,fn){
    this.mousemoveobj[k] = fn;
    window.onmousemove = function(){
      for(key in my.mousemoveobj){
        if(typeof my.mousemoveobj[key] == "function"){
           my.mousemoveobj[key]();
        }
      }
    }
  },
  mouseup : function(k,fn){
    this.mouseupobj[k] = fn;
    window.onmouseup = function(){
      for(key in my.mouseupobj){
        if(typeof my.mouseupobj[key] == "function"){
           my.mouseupobj[key]();
        }
      }
    }
  },
  resize : function(k,fn){
    this.resizeobj[k] = fn;
    window.onresize = function(){
      for(key in my.resizeobj){
        if(typeof my.resizeobj[key] == "function"){
           my.resizeobj[key]();
        }
      }
    }
  },
}

wachdiv = {
  arr : [],
  k : [],
  divsize:function(id,fn,k){
    if(k){
      for(var j = 0;j<wachdiv.arr.length;j++){
        if(wachdiv.arr[j].k == k){
          wachdiv.arr.splice(j,1)
          // return
        }
      }
    }

    if(this.inter){
       clearInterval(this.inter);
    }
    wachdiv.k.push(k)
    var a = {}
    a.k = k
    a.id = id
    a.fn = fn
    a.w = id.offsetWidth
    a.h = id.offsetHeight
    wachdiv.arr.push(a)
    this.inter = setInterval(function(){ 
       for(var i = 0;i<wachdiv.arr.length;i++){
         var w = wachdiv.arr[i].id.offsetWidth
         var h = wachdiv.arr[i].id.offsetHeight
         if(wachdiv.arr[i].w != w  || wachdiv.arr[i].h != h ){
           wachdiv.arr[i].w = w
           wachdiv.arr[i].h = h
           wachdiv.arr[i].fn();
         }
       }
    },100)
  }
}

// function wachdiv(id,fn){
//   var h = id.offsetHeight;
//   setInterval(function(){
//     fn()
//     // console.log("aa")
//   },100)
// }
 function abc(){
  console.log("aa")
}
