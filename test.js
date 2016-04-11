require('./index.js');
var assert = require('assert');

var A = klas({
    constructor: function() {
        this.c = this.a + this.b;
    },
    a: 1,
    b: 1,
    fn:function(){
        return 'fn in A';
    },
    fnA: function() {
        return 'fnA';
    }
});

assert.ok((new A) instanceof A);

var B = klas(A, {
    fn:function(){
        return 'fn in B';
    },
    b: 2
});

var b = new B();
assert.equal(b.c,3);
assert.equal(b.fn(),'fn in B');

var mixin1 = {
    fn: function() {
        return 'fn in mixin1';
    }
};
var mixin2 = {
    fn: function() {
        return 'fn in mixin2';
    }
};
var C = klas(B, mixin1,mixin2, {
    constructor: function() {
        // must call super_
        C.super_.call(this);
        this.d = this.c + this.a;
    },
    fnC: function() {
        return 'fnC';
    }
});

var c = new C();

assert.equal(c.fnA(),'fnA');
assert.equal(c.fn(),'fn in mixin2');
assert.equal(c.fnC(),'fnC');
assert.equal(c.d,4);


var D=klas(C,{
    fn:function(){
        return 'fn in D';
    }
});

var d=new D();
assert.equal(d.fn(),'fn in D');


var E=klas(mixin2,{
    constructor:function(name){
        // must call super_
        E.super_.call(this);
        this.name=name;
    }
});
var e=new E('e name');

assert.equal(e.name,'e name');
assert.equal(e.fn(),'fn in mixin2');