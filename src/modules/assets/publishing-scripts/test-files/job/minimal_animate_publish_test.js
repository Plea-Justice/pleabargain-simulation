//This test file is for testing the hiding (via commenting out) and unhiding the lines of code that have 'addTween' in them, which are the lines that draw the previously defined shapes.

// Group2

this.shape = new cjs.Shape();
this.shape.graphics.f().s("#663300").ss(1,1,1).p("EBHXAAAQAAW105QIQ06QJ9kAAQ9jAA05wJQ06wIAA21QAA2zU6wJQU5wIdjAAQdkAAU6QIQU5QJAAWzg");
this.shape.setTransform(1005.55,596.9);

this.shape_1 = new cjs.Shape();
this.shape_1.graphics.f("#E5CCFF").s().p("EgydAm9Q05wJAA20QAA2zU5wJQU6wIdjgBQdkABU5QIQU6QJAAWzQAAW006QJQ05QJ9kgBQ9jAB06wJg");
this.shape_1.setTransform(1005.55,596.9);

 this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
