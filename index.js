(function() {
    /**
     * klas is a global variable
     * [super_],[mixin..],proto
     */
    Klas=function(){};
    Klas.extend = function() {
        var super_ = this;
        var proto;
        // super_ + mixins
        var mixins = [];

        // init params
        if (arguments.length === 0) {
            proto = {};
        } else {
            mixins = [].slice.call(arguments, 0, -1);
            proto = arguments[arguments.length - 1];
        }

        // default constructor
        var ctor = proto.constructor = proto.constructor_ || function() {
            super_.call(this);
        };
        delete proto.constructor_;

        // inherit super_`s methods
        var TempCtor = function() {};
        TempCtor.prototype = super_.prototype;
        var realProto = ctor.prototype = new TempCtor();


        // inherit super_`s static functions
        extend(ctor, super_);

        // inherit mixins
        for (var i = 0; i < mixins.length; i++) {
            // inherit mixin`s static functions
            var mixin = mixins[i];
            extend(ctor, mixin);

            // inherit mixin`s methods
            var _proto = mixin.prototype;
            extend(realProto, _proto);
        }


        // static functions
        if (proto.statics_) {
            extend(ctor, proto.statics_);
            delete proto.statics_;
        }

        // set superClass
        ctor.super_ = super_;

        // extends proto
        extend(realProto, proto);

        return ctor;
    };

    function extend(obj, extension) {
        for (var prop in extension) {
            obj[prop] = extension[prop];
        }
    }
})();
