/*
 * @Date: 2020-06-24 17:37:32
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-29 10:37:07
 * @FilePath: \codeTest\JsProd\图片添加水印\img2blob.js
 */
$.fn.img2blob = function (a) {
  var b = {
    watermark: '',
    fontStyle: 'Arial',
    fontSize: '30',
    fontColor: 'black',
    fontX: 10,
    fontY: 50
  };
  if (typeof a === 'object') {
    a.watermark = (a.watermark == undefined ? b.watermark : a.watermark);
    a.fontStyle = (a.fontStyle == undefined ? b.fontStyle : a.fontStyle);
    a.fontSize = (a.fontSize == undefined ? b.fontSize : a.fontSize);
    a.fontColor = (a.fontColor == undefined ? b.fontColor : a.fontColor);
    a.fontX = (a.fontX == undefined ? b.fontX : a.fontX);
    a.fontY = (a.fontY == undefined ? b.fontY : a.fontY);
  } else {
    a = b;
  }
  $(this).each(function (i, c) {
    var d = $(this).data('img2blob'),
      e = '.' + $(this).attr('class'),
      f = new Image();
    f.onload = function () {
      var g = document.createElement('canvas');
      g.width = f.naturalWidth;
      g.height = f.naturalHeight;
      var h = g.getContext('2d');
      h.drawImage(f, 0, 0);
      if (a.watermark != '') {
        h.font = a.fontSize + 'px ' + a.fontStyle;
        h.fillStyle = a.fontColor;
        h.fillText(a.watermark, a.fontX, a.fontY);
      }
      var j = g.toDataURL('image/png'),
        k = DataUriToBinary(j),
        l = new Blob([k], {
          type: 'image/png'
        }),
        m = window.URL.createObjectURL(l);
      var aaa = new FileReader();
      aaa.readAsDataURL(l); //读取文件保存在result中
      aaa.onload = function (v) {
        var getRes = v.target.result; //读取的结果在result中
        $(e).eq(i).attr('src', getRes);
      }
    };
    f.src = d;
  });

  function DataUriToBinary(n) {
    var o = ';base64,',
      p = n.indexOf(o) + o.length,
      q = n.substring(p),
      r = window.atob(q),
      s = r.length,
      t = new Uint8Array(new ArrayBuffer(s));
    for (i = 0; i < s; i++) {
      t[i] = r.charCodeAt(i);
    }
    return t;
  }
}