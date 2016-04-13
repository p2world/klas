# klas

javascript class,oo,multiple-inheritance lib to all browser and nodejs

Probably the fastest JS class system out there. 100% no wrappers, same perfs as hand-written pure JS classes.

inspired by [my.class.js](https://github.com/jiem/my-class)

usage:`klas([parent],[mixins..],proto)`



```javascript
var assert = require('better-assert');

// create class
var A = klas({
    statics_:{
        toString:function(){
            return 'A toString';
        },
        staticA:function(){
            return 'staticA';
        }
    },
    constructor_: function() {
        this.c = this.a + this.b;
    },
    a: 1,
    b: 1,
    fn: function() {
        return 'fn in A';
    },
    fnA: function() {
        return 'fnA';
    },
    toString:function(){
        return 'a:'+this.a;
    }
});

assert(A.prototype.b === 1);
assert(a instanceof A);
assert(a.c === 2);
assert(A + '' === 'A toString');
assert(A.staticA() === 'staticA');
assert(a + '' === 'a:1');


// inherit
var bConstructor_ = function() {
    B.super_.call(this);
    this.d = this.c + 1;
};
var B = klas(A, {
    statics_:{
        staticB:function(){
            return 'staticB';
        }
    },
    constructor_: bConstructor_,
    fn: function() {
        return 'fn in B';
    },
    a: 2
});

var b = new B();

assert(bConstructor_ === B);
assert(b instanceof B);
assert(b instanceof A);
assert(b.fn() === 'fn in B');
assert(B + '' === 'A toString');
assert(b + '' === 'a:2');
assert(B.staticA() == 'staticA');
assert(B.staticB() == 'staticB');
assert(b.c === 3);


// mixin
var C = klas({
    statics_: {
        toString: function() {
            return 'C toString';
        },
        fnC: function() {
            return 'fnC';
        }
    },
    toString: function() {
        return 'c toString';
    },
    methodC: function() {
        return 'methodC';
    }
});

var D = klas({
    statics_: {
        toString: function() {
            return 'D toString';
        }
    },
    toString: function() {
        return 'd toString';
    }
});
// D is a mixin class
var E = klas(C, D, {});
var e = new E();
assert(e instanceof E);
assert(e instanceof C);
assert(!(e instanceof D));
assert('' + e === 'd toString');
assert(E + '' === 'D toString');
assert(e.methodC() === 'methodC');

// C is a mixin class
var F = klas(D, C, {});
var f = new F();
assert(E.fnC() === 'fnC');
assert('' + new F === 'c toString');
assert(F + '' === 'C toString');
assert((new F).methodC() === 'methodC');
assert(F.fnC() === 'fnC');
```


## other

* `klas` is a global variable
* constructor_ must call `super_`
* the default constructor_ is `Class.super_.call(this);`
* the overwrite order is the arguments order:`parent < mixins1 < mixin2 < proto`