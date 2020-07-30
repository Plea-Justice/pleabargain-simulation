// constructor
function foo(name, thing) {
  this.name = name;
  this.thing = thing;
  alert("foo created");
}

foo.prototype = {
  constructor: foo,
  bar:function (string) {
    alert("changing thing: " + this.thing);
    this.thing = string;
    alert("thing changed: " + this.thing);
  }
}
