import GBK from 'gbk.js'

export let formatDateTime = function(date, fmt) { //author: meizz 
  let time = new Date(date);  
  var o = {   
    "M+" : time.getMonth()+1,                 //月份   
    "d+" : time.getDate(),                    //日   
    "h+" : time.getHours(),                   //小时   
    "m+" : time.getMinutes(),                 //分   
    "s+" : time.getSeconds(),                 //秒   
    "q+" : Math.floor((time.getMonth()+3)/3), //季度   
    "S"  : time.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

export let getUniqueId = function () {
  const firstCount = 5;
  const secondCount = 3;
  const thirdCount = 5;
  let chars = '0123456789abcdef'.split('');
  let fn = () => {
    return chars[Math.floor(Math.random() * 16)]
  };
  let uuid = '';
  for (let i = 0; i < firstCount; i++) {
    uuid += fn()
  }
  uuid += '12345'.split('')[Math.floor(Math.random() * 5)];
  for (let i = 0; i < secondCount; i++) {
    uuid += fn()
  }
  uuid += '89ab'.split('')[Math.floor(Math.random() * 4)];
  for (let i = 0; i < thirdCount; i++) {
    uuid += fn()
  }
  return uuid
}

export let downFile = function (name, contents, mimeType) {
  let byteArray = new Uint8Array(GBK.encode(contents));
  mimeType = mimeType || 'text/plain';
  var blob = new window.Blob([byteArray], {
    type: mimeType
  });
  //IE浏览器可以用window.navigator.msSaveOrOpenBlob来判断是否支持createObjectURL对象
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  }
  //其他
  var dlink = document.createElement('a');
  dlink.setAttribute('type', 'hidden');
  dlink.download = name;
  dlink.href = window.URL.createObjectURL(blob);
  document.body.appendChild(dlink);
  dlink.onclick = function (e) {
    // revokeObjectURL needs a delay to work properly
    var that = this;
    setTimeout(function () {
      window.URL.revokeObjectURL(that.href)
    }, 1500)
  };

  dlink.click();
  dlink.remove()
}