/**
 * [parent],[mixins..],proto
 */
// to global
klas = function() {
    var parent = function() {};
    var proto;
    // mixins + proto
    var protos;

    if (arguments.length === 0) {
        proto = {};
        protos = [proto];
    } else if (arguments.length === 1) {
        proto = arguments[0];
        protos = arguments;
    } else {
        if(typeof arguments[0] === 'function'){
            parent = arguments[0];
            protos = [].slice.call(arguments, 1);
        }else{
            protos = arguments;
        }
        proto = arguments[arguments.length - 1];
    }

    var ctor = proto.hasOwnProperty('constructor') ? proto.constructor : function() {
        ctor.super_.call(this);
    };


    ctor.super_ = parent;
    var TempCtor = function() {};
    TempCtor.prototype = parent.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;

    var realProto = ctor.prototype;

    for (var i = 0; i < protos.length; i++) {
        var mixin = protos[i];
        for (var key in mixin) {
            realProto[key] = mixin[key];
        }
    }
    return ctor;
};

module.exports = klas;