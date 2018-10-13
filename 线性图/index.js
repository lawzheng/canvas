var LineChart = function (ctx) {
  this.ctx = ctx || document.querySelector('canvas').getContext('2d');
  this.canvasWidth = this.ctx.canvas.width;
  this.canvasHeight = this.ctx.canvas.height;
  this.gridSize = 10;
  this.space = 20;
  this.x0 = this.space;
  this.y0 = this.canvasHeight - this.space;
  this.arrowSize = 10;
  this.dotSize = 6;
};

LineChart.prototype.init = function (data) {
  this.drawGrid();
  this.drawAxis();
  this.drawDots(data);
};

LineChart.prototype.drawGrid = function () {
  var xTotal = Math.floor(this.canvasHeight / this.gridSize);
  var yTotal = Math.floor(this.canvasWidth / this.gridSize);
  this.ctx.strokeStyle = '#eee';
  //横线
  for (var i = 0; i < xTotal; i++) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, i * this.gridSize - 0.5);
    this.ctx.lineTo(this.canvasWidth, i * this.gridSize - 0.5);
    this.ctx.stroke();
  }
  //纵线
  for (var i = 0; i < yTotal; i++) {
    this.ctx.beginPath();
    this.ctx.moveTo(i * this.gridSize - 0.5, 0);
    this.ctx.lineTo(i * this.gridSize - 0.5, this.canvasHeight);
    this.ctx.stroke();
  }
};

LineChart.prototype.drawAxis = function () {
  this.ctx.beginPath();
  this.ctx.moveTo(this.x0 - 0.5, this.y0 - 0.5);
  this.ctx.lineTo(this.canvasWidth - this.x0 - 0.5, this.y0 - 0.5);
  this.ctx.lineTo(this.canvasWidth - this.x0 - 0.5 - this.arrowSize, this.y0 - 0.5 + this.arrowSize / 2);
  this.ctx.lineTo(this.canvasWidth - this.x0 - 0.5 - this.arrowSize, this.y0 - 0.5 - this.arrowSize / 2);
  this.ctx.lineTo(this.canvasWidth - this.x0 - 0.5, this.y0 - 0.5);
  this.ctx.fill();
  this.ctx.strokeStyle = '#000';
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.moveTo(this.x0 - 0.5, this.y0 - 0.5);
  this.ctx.lineTo(this.x0 - 0.5, this.x0 - 0.5);
  this.ctx.lineTo(this.x0 - 0.5 + this.arrowSize / 2, this.x0 - 0.5 + this.arrowSize);
  this.ctx.lineTo(this.x0 - 0.5 - this.arrowSize / 2, this.x0 - 0.5 + this.arrowSize);
  this.ctx.lineTo(this.x0 - 0.5, this.x0 - 0.5);
  this.ctx.fill();
  this.ctx.strokeStyle = '#000';
  this.ctx.stroke();
};

LineChart.prototype.drawDots = function (data) {
  var that = this;
  var prevCanvasX = 0;
  var prevCanvasY = 0;
  data.forEach(function (item,i) {
    var canvasX = that.x0 + item.x;
    var canvasY = that.y0 - item.y;
    that.ctx.beginPath();
    that.ctx.moveTo(canvasX-that.dotSize/2,canvasY-that.dotSize/2);
    that.ctx.lineTo(canvasX+that.dotSize/2,canvasY-that.dotSize/2);
    that.ctx.lineTo(canvasX+that.dotSize/2,canvasY+that.dotSize/2);
    that.ctx.lineTo(canvasX-that.dotSize/2,canvasY+that.dotSize/2);
    that.ctx.closePath();
    that.ctx.fill();

    if(i==0){
      that.ctx.beginPath();
      that.ctx.moveTo(that.x0,that.y0);
      that.ctx.lineTo(canvasX,canvasY);
      that.ctx.stroke();
    }else{
      that.ctx.beginPath();
      that.ctx.moveTo(prevCanvasX,prevCanvasY);
      that.ctx.lineTo(canvasX,canvasY);
      that.ctx.stroke();
    }
    prevCanvasX = canvasX;
    prevCanvasY = canvasY;
  });


};