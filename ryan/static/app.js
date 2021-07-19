function ajax1(url, str, that) {
  var resault = $.ajax({
    url: URL + "/" + url + "/list/?embed=" + str,
    headers: token,
    type: "GET",
    processData: false,
    contentType: "application/json",
    async: true,
    success: function(data) {
      // console.log(data)
      that.data = data
      if (that.$refs.tabelbottom) {
        that.data1 = that.data
        that.$refs.tabelbottom.parentTR(that.data)
        that.routers = true
      }
    },
    error: function(xhr, status, text) {
      // console.log(xhr)
    },
  });
  // console.log(resault.responseText)
  // 需要async: false,
}

function del1(that, url) {
  var dellist = that.dellist
  var fn = function() {
    $.ajax({
      url: URL + "/" + url + "/delete/",
      headers: token,
      data: JSON.stringify(dellist),
      type: "POST",
      processData: false,
      contentType: "application/json",
      success: function(data) {
        location.reload()
      },
      error: function(xhr, status, text) {
        alert1("删除失败")
      },
    })
  }
  if (dellist.length < 1) {
    alert1("请最少选择一项")
  } else {
    // console.log(dellist)
    var text2 = '确认删除 ' + dellist.length + ' 个项吗？'
    confirm1('删除？', text2, fn)
  }
}

function sousuochange(that,name) {
  that.data1 = that.data.filter(function(k, i) {
    return k.name.indexOf(that.sousuo) != -1
  })
  that.$refs.tabelbottom.parentTR(that.data1)
}

function initchecked(that) {
  var checkth = document.getElementById("appcheckth")
  var checktd = document.getElementsByClassName("appchecktd")
  checkth.checked = false
  for (var i = 0; i < checktd.length; i++) {
    checktd[i].checked = false
  }
  that.dellist = []
  that.checkcount = 0
}

function appcheckth(that) {
  // 获取被选中的复选框：使用 :checked 方法
  // var chec = $("input[type='checkbox']:checked");
  var checkth = document.getElementById("appcheckth").checked
  var checktd = document.getElementsByClassName("appchecktd")
  that.dellist = []
  if (checkth) {
    for (var i = 0; i < checktd.length; i++) {
      checktd[i].checked = true
    }
    for (var ii = 0; ii < that.data1.length; ii++) {
      var obj = {
        'id': that.data1[ii].id
      }
      that.dellist.push(obj)
    }
    that.checkcount = that.data1.length;

  } else {
    for (var i = 0; i < checktd.length; i++) {
      checktd[i].checked = false
    }
    that.checkcount = 0;
  }
  // console.log(that.dellist)
}

function appchecktd(that) {
  that.dellist = []
  var checkth = document.getElementById("appcheckth")
  var checktd = document.getElementsByClassName("appchecktd")
  var count = 0;
  for (var i = 0; i < checktd.length; i++) {
    if (checktd[i].checked) {
      count += 1
      var idd = checktd[i].getAttribute('idd')
      var obj = {
        'id': idd
      }
      that.dellist.push(obj)
    }
  }
  that.checkcount = count;
  checkth.checked = count == that.data1.length ? true : false;
  // console.log(that.dellist)
}
