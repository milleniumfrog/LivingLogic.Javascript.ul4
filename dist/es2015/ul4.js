export var ul4;
(function (ul4) {
    class _Set {
        add(...items) {
            for (let item of items)
                this.items[item] = true;
        }
    }
    ul4._Set = _Set;
})(ul4 || (ul4 = {}));
export var ul4on;
(function (ul4on) {
    let _registry = {};
    const _havemap = (typeof (Map) === "function" && typeof (Map.prototype.forEach) === "function");
    const _havemapconstructor = (function () {
        if (_havemap) {
            try {
                if (new Map([[1, 2]]).size == 1)
                    return true;
            }
            catch (error) {
            }
        }
        return false;
    })();
    const _haveset = (typeof (Set) === "function" && typeof (Set.prototype.forEach) === "function");
    const _havesetconstructor = (function () {
        if (_haveset) {
            try {
                if (new Set([1, 2]).size == 2)
                    return true;
            }
            catch (error) {
            }
        }
        return false;
    })();
    const _makemap = (function () {
        if (_havemap) {
            return function (...items) {
                let map = new Map();
                for (let [key, value] of items)
                    map.set(key, value);
                return map;
            };
        }
        else {
            return function (...items) {
                let map = {};
                for (let [key, value] of items)
                    map[key] = value;
                return map;
            };
        }
    })();
    const _setmap = (function () {
        if (_havemap) {
            return function (map, key, value) {
                map.set(key, value);
            };
        }
        else {
            return function (map, key, value) {
                map[key] = value;
            };
        }
    })();
    const _emptymap = (function () {
        if (_havemap) {
            return function () {
                return new Map();
            };
        }
        else {
            return function () {
                return {};
            };
        }
    })();
    const _getmap = (function () {
        if (_havemap) {
            return function (map, key) {
                return map.get(key);
            };
        }
        else {
            return function (map, key) {
                return map[key];
            };
        }
    })();
    const _emptyset = (function () {
        if (_haveset) {
            return function () {
                return new Set();
            };
        }
        else {
            return function () {
                return new ul4._Set();
            };
        }
    })();
    function _makeset(...items) {
        let set = _emptymap();
        for (let item of items) {
            set.add(item);
        }
        return set;
    }
    function register(name, f) {
        f.prototype.ul4onname = name;
        _registry[name] = f;
    }
    ul4on.register = register;
    function dumps(obj, indent) {
        let encoder = new Encoder(indent);
    }
    ul4on.dumps = dumps;
    function loads(data, registry) {
        let decoder = new Decoder(data, registry);
        return decoder.load();
    }
    ul4on.loads = loads;
    class Encoder {
        constructor(ident = null) {
            this.ident = ident;
            this.data = [];
            this._level = 0;
            this._strings2index = {};
            this._ids2index = {};
            this._backrefs = 0;
        }
    }
    ul4on.Encoder = Encoder;
    class Decoder {
        constructor(data, registry = null) {
            this.data = data;
            this.registry = registry;
            this.pos = 0;
            this.backrefs = [];
            this.stack = [];
        }
        load() { }
        ;
    }
    ul4on.Decoder = Decoder;
})(ul4on || (ul4on = {}));
//# sourceMappingURL=ul4.js.map