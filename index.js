var Point = require('ui-point');

function Rect(leftTopPoint, rightBottomPoint) {
  if (!(this instanceof Rect)) {
    return new Rect();
  }
  this._ltPoint = leftTopPoint.clone();
  this._lbPoint = Point(leftTopPoint.x(), rightBottomPoint.y());
  this._rtPoint = Point(rightBottomPoint.x(), leftTopPoint.y());
  this._rbPoint = rightBottomPoint.clone();
}

Rect.isRect = function(r) {
  return r instanceof Rect;
};

Rect.validate = function(leftTopPoint, rightBottomPoint) {
  return leftTopPoint.x() <= rightBottomPoint.x() && leftTopPoint.y() <= rightBottomPoint.y();
};

Rect.prototype.validate = function() {
  return Rect.validate(this.leftTop(), this.rightBottom());
};

Rect.union = function(r1, r2) {
  var left = Math.max(r1.left(), r2.left());
  var right = Math.min(r1.right(), r2.right());
  var top = Math.max(r1.top(), r2.top());
  var bottom = Math.min(r1.bottom(), r2.bottom());

  var ltPoint = Point(left, top);
  var rbPoint = Point(right, bottom);

  if ( !Rect.validate(ltPoint, rbPoint) ) {
    return null;
  }

  return new Rect(ltPoint, rbPoint);
};

Rect.prototype.union = function(another) {
  return Rect.union(this, another);
};

Rect.split = function(rect, x, y) {
  var rects = [];
  for (var i = 0; i < x; i++) {
    var column = [];
    for (var j = 0; j < y; j++) {
      var lt = Point(rect.x() * i / x, rect.y() * j / y);
      var rb = Point(rect.x() * (i+1) / x, rect.y() * (j+1) / y);
      column.push(new Rect(lt, rb));
    }
    rects.push(column);
  }
  return rects;
};

Rect.prototype.split = function(x, y) {
  return Rect.split(this, x, y);
};

Rect.prototype.center = function() {
  return Point((this._ltPoint.x() + this._rbPoint.x())/2, (this._ltPoint.y() + this._rbPoint.y())/2);
};

Rect.prototype.left = function() {
  return this._ltPoint.x();
};

Rect.prototype.right = function() {
  return this._rbPoint.x();
};

Rect.prototype.top = function() {
  return this._ltPoint.y();
};

Rect.prototype.bottom = function() {
  return this._rbPoint.y();
};

Rect.prototype.leftTop = function() {
  return this._ltPoint.clone();
};

Rect.prototype.leftBottom = function() {
  return this._lbPoint.clone();
};

Rect.prototype.rightTop = function() {
  return this._rtPoint.clone();
};

Rect.prototype.rightBottom = function() {
  return this._rbPoint.clone();
};

Rect.prototype.centerTop = function() {
  return Point(this.center().x(), this.top());
};

Rect.prototype.centerBottom = function() {
  return Point(this.center().x(), this.bottom());
};

Rect.prototype.leftCenter = function() {
  return Point(this.left(), this.center().y());
};

Rect.prototype.rightCenter = function() {
  return Point(this.right(), this.center().x());
};

Rect.prototype.width = function() {
  return this.right() - this.left();
};

Rect.prototype.height = function() {
  return this.bottom() - this.top();
};

Rect.prototype.area = function() {
  return this.width() * this.height();
};

Rect.equals = function(r1, r2) {
  return r1.leftTop().equals(r2.leftTop()) && r1.rightBottom.equals(r2.rightBottom());
};

Rect.prototype.equlas = function(another) {
  return Rect.equals(this, another);
};

Rect.prototype.referencePoints = function() {
  var me = this;
  return [
    me.leftTop(),
    me.centerTop(),
    me.rightTop(),
    me.leftCenter(),
    me.center(),
    me.rightCenter(),
    me.leftBottom(),
    me.centerBottom(),
    me.rightBottom(),
  ];
};

Rect.Point = Point;

module.exports = Rect;
