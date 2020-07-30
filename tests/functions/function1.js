// constructor
function foo(name, thing) {
  this.name = name;
  this.thing = thing;
  alert("foo created with name " + this.name + " and thing " + this.thing);
}

foo.prototype = {
  constructor: foo,
  bar:function (string) {
    alert(this.name + "'s thing changing from " + this.thing);
    this.thing = string;
    alert(this.name + "'s thing changed to " + this.thing);
  }
}
