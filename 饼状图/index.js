var pie = function (ctx) {
  this.ctx = ctx || document.querySelector('canvas').getContext('2d');
  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;
};

pie.prototype.init = function (data) {
  this.drawPie(data);
};

pie.prototype.drawPie = function (data) {
  var all = 0;
  for (i = 0; i < data.length; i++) {
    all += data[i].num;
  }

  var start = 0;
  var end = 0;

  for (i = 0; i < data.length; i++) {
    start = end;
    end += Math.PI * 2 * data[i].num / all;

    var r = Math.floor(Math.random(0, 1) * 256);
    var g = Math.floor(Math.random(0, 1) * 256);
    var b = Math.floor(Math.random(0, 1) * 256);

    this.ctx.beginPath();
    this.ctx.moveTo(this.w / 2 - 0.5, this.h / 2 - 0.5);
    this.ctx.arc(this.w / 2 - 0.5, this.h / 2 - 0.5, 150, start, end);
    this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.ctx.fill();

    this.drawLine(data[i].title, start, end, r, g, b);

    this.drawText(data[i], i, r, g, b);
  }
};

pie.prototype.drawLine = function (title, start, end, r, g, b) {
  var x = Math.cos((end - start) / 2 + start) * 170;
  var y = Math.sin((end - start) / 2 + start) * 170;

  this.ctx.beginPath();
  this.ctx.moveTo(this.w / 2, this.h / 2);
  this.ctx.lineTo(this.w / 2 + x, this.h / 2 + y);
  this.ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  //this.ctx.setLineDash([0,150,20]);不传颜色也可以用虚线
  this.ctx.textBaseline = 'bottom';
  this.ctx.font = '14px Microsoft YaHei';
  var textWidth = this.ctx.measureText(title).width;
  if (x < 0) {
    this.ctx.lineTo(this.w / 2 + x - textWidth, this.h / 2 + y);
    this.ctx.textAlign = 'left';
    textWidth = -textWidth;
  } else {
    this.ctx.lineTo(this.w / 2 + x + textWidth, this.h / 2 + y);
    this.ctx.textAlign = 'right';
  }
  this.ctx.stroke();

  this.ctx.fillText(title, this.w / 2 + x + textWidth, this.h / 2 + y);
};

pie.prototype.drawText = function (data, i, r, g, b) {
  var space = 20;
  var between = 10;
  var w = 20;
  var h = 10;
  var titleWidth = this.ctx.measureText(data.title).width;
  this.ctx.beginPath();
  this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  this.ctx.fillRect(space, space+(i*(h+between)), w, h);
  this.ctx.font = '10px Microsoft YaHei';
  this.ctx.textAlign='left';
  this.ctx.textBaseline= 'top';
  this.ctx.fillText(data.title, space+w+between, space+(i*(h+between)));
  this.ctx.fillText(data.num, space+w+between*2+titleWidth, space+(i*(h+between)));

};