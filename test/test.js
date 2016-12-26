var Rect = require("..");
var expect = require('expect');
var Point = Rect.Point;

describe('Rect', function(){
  it('should work', function(){
    var rect = new Rect(Point(0,0), Point(3, 4));
    expect(Rect.isRect(rect)).toBe(true);
  });
});

describe('Rect#left Rect#right Rect#top Rect#bottom', function(){
  it('should correct', function(){
    var rect = new Rect(Point(0,0), Point(3, 4));
    expect(rect.left()).toBe(0);
    expect(rect.top()).toBe(0);
    expect(rect.right()).toBe(3);
    expect(rect.bottom()).toBe(4);
  });
  it('should not effect by init value', function(){
    var lt = Point(3, 4);
    var rb = Point(4, 5);
    
  });
});
