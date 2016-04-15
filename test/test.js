/*global Klas,describe,it*/
require('../');
var assert = require('better-assert');
describe('Klas', function() {
    var A = Klas.extend({
        statics_: {
            toString: function() {
                return 'A toString';
            },
            staticA: function() {
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
        toString: function() {
            return 'a:' + this.a;
        }
    });
    var a = new A();
    describe('instantiation', function() {
        it('prototype', function() {
            assert(A.prototype.b === 1);
        });
        it('constructor_', function() {
            assert(a instanceof A);
            assert(a.c === 2);
        });
        it('statics', function() {
            assert(A + '' === 'A toString');
            assert(A.staticA() === 'staticA');
        });
        it('overwrite toString', function() {
            assert(a + '' === 'a:1');
        });
    });
    describe('inherit1', function() {
        var B = A.extend({
            statics_: {
                staticB: function() {
                    return 'staticB';
                }
            },
            fn: function() {
                return 'fn in B';
            },
            a: 2
        });
        var b = new B();

        it('inherit', function() {
            assert(b instanceof B);
            assert(b instanceof A);
            assert(b.fn() === 'fn in B');
            assert(B + '' === 'A toString');
            assert(b + '' === 'a:2');
            assert(B.staticA() === 'staticA');
            assert(B.staticB() === 'staticB');
        });

        it('super constructor_', function() {
            assert(b.c === 3);
        });
    });
    describe('inherit2', function() {
        var bConstructor_ = function() {
            B.super_.call(this);
            this.d = this.c + 1;
        };
        var B = A.extend({
            constructor_: bConstructor_,
            fn: function() {
                return 'fn in B';
            },
            b: 2
        });
        var b = new B();

        it('super constructor_', function() {
            assert(bConstructor_ === B);
            assert(b.d === 4);
        });
    });
    var C = Klas.extend({
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

    var D = Klas.extend({
        statics_: {
            toString: function() {
                return 'D toString';
            }
        },
        toString: function() {
            return 'd toString';
        }
    });
    describe('mixin1', function() {
        it('mixin', function() {
            var E = C.extend(D, {});
            var e = new E();
            assert(e instanceof E);
            assert(e instanceof C);
            assert(!(e instanceof D));
            assert('' + e === 'd toString');
            assert(E + '' === 'D toString');
            assert(e.methodC() === 'methodC');
            assert(E.fnC() === 'fnC');


            var F = D.extend(C, {});
            var f = new F();
            assert('' + f === 'c toString');
            assert(F + '' === 'C toString');
            assert(f.methodC() === 'methodC');
            assert(F.fnC() === 'fnC');
        });
    });
    describe('mixin2', function() {
        var CC = C.extend({});
        var DD = D.extend({});

        it('mixin', function() {
            var E = CC.extend(DD, {});
            var e = new E();
            assert(e instanceof E);
            assert(e instanceof CC);
            assert(!(e instanceof DD));
            assert('' + e === 'd toString');
            assert(E + '' === 'D toString');
            assert(e.methodC() === 'methodC');
            assert(E.fnC() === 'fnC');


            var F = DD.extend(CC, {});
            var f = new F();
            assert('' + f === 'c toString');
            assert(F + '' === 'C toString');
            assert(f.methodC() === 'methodC');
            assert(F.fnC() === 'fnC');
        });
    });
    describe('mixin3', function() {
        it('mixin', function() {
            var E = C.extend(D, {
                statics_: {
                    fnC: function() {
                        return 'fnE';
                    }
                },
                methodC: function() {
                    return 'methodE';
                }
            });
            var e = new E();
            assert(e instanceof E);
            assert(e instanceof C);
            assert(!(e instanceof D));
            assert('' + e === 'd toString');
            assert(E + '' === 'D toString');
            assert(e.methodC() === 'methodE');
            assert(E.fnC() === 'fnE');
        });
    });
});
