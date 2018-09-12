const _js_Date = Date;
var helpers;
(function (helpers) {
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
    helpers._setmap = (function () {
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
    helpers._emptymap = (function () {
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
    helpers._emptyset = (function () {
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
        let set = helpers._emptymap();
        for (let item of items) {
            set.add(item);
        }
        return set;
    }
    helpers._makeset = _makeset;
})(helpers || (helpers = {}));
export var ul4;
(function (ul4) {
    let _nextid = 1;
    function _unorderable(operator, obj1, obj2) {
        throw new ul4.TypeError("unorderable types: " + ul4._type(obj1) + " " + operator + " " + ul4._type(obj2));
    }
    ul4._unorderable = _unorderable;
    function expose(f, signature, options) {
        options = options || {};
        if (options.name)
            f._ul4_name = options.name;
        if (ul4._islist(signature))
            signature = new ul4.Signature(...signature);
        f._ul4_signature = signature;
        f._ul4_needsobject = options.needsobject || false;
        f._ul4_needscontext = options.needscontext || false;
    }
    ul4.expose = expose;
    function _find(obj, sub, start = null, end = null) {
        if (start === null)
            start = 0;
        if (end === null)
            end = obj.length || 0;
        if (start < 0)
            start += obj.length;
        if (end < 0)
            end += obj.length;
        start = ul4._bound(start, obj.length);
        end = ul4._bound(end, obj.length);
        if (start !== 0 || end !== obj.length) {
            if (typeof (obj) == "string")
                obj = obj.substring(start, end);
            else
                obj = obj.slice(start, end);
        }
        let result = obj.indexOf(sub);
        if (result !== -1)
            result += start;
        return result;
    }
    ul4._find = _find;
    function _eq(obj1, obj2) {
        let numbertypes = ["boolean", "number"];
        if (obj1 && typeof (obj1.__eq__) === "function")
            return obj1.__eq__(obj2);
        else if (obj2 && typeof (obj2.__eq__) === "function")
            return obj2.__eq__(obj1);
        else if (obj1 === null)
            return obj2 === null;
        else if (numbertypes.indexOf(typeof (obj1)) != -1) {
            if (numbertypes.indexOf(typeof (obj2)) != -1)
                return obj1 == obj2;
            else
                return false;
        }
        else if (typeof (obj1) === "string") {
            if (typeof (obj2) === "string")
                return obj1 == obj2;
            else
                return false;
        }
        else if (ul4._isdatetime(obj1)) {
            if (ul4._isdatetime(obj2))
                return obj1.getTime() == obj2.getTime();
            else
                return false;
        }
        else if (ul4._islist(obj1)) {
            if (ul4._islist(obj2)) {
                if (obj1 === obj2)
                    return true;
                if (obj1.length != obj2.length)
                    return false;
                for (let i = 0; i < obj1.length; ++i) {
                    if (!ul4._eq(obj1[i], obj2[i]))
                        return false;
                }
                return true;
            }
            else
                return false;
        }
        else if (ul4._isobject(obj1)) {
            if (ul4._isobject(obj2)) {
                if (obj1 === obj2)
                    return true;
                for (let key in obj1) {
                    if (obj2.hasOwnProperty(key)) {
                        if (!ul4._eq(obj1[key], obj2[key]))
                            return false;
                    }
                    else
                        return false;
                }
                for (let key in obj2) {
                    if (!obj1.hasOwnProperty(key))
                        return false;
                }
                return true;
            }
            else if (ul4._ismap(obj2)) {
                for (let key in obj1) {
                    if (obj2.has(key)) {
                        if (!ul4._eq(obj1[key], obj2.get(key)))
                            return false;
                    }
                    else
                        return false;
                }
                let result = true;
                obj2.forEach(function (value, key) {
                    if (!obj1.hasOwnProperty(key))
                        result = false;
                });
                return result;
            }
            else
                return false;
        }
        else if (ul4._ismap(obj1)) {
            if (ul4._isobject(obj2)) {
                let result = true;
                obj1.forEach(function (value, key) {
                    if (result) {
                        if (!obj2.hasOwnProperty(key))
                            result = false;
                        else if (!ul4._eq(obj1.get(key), obj2[key]))
                            result = false;
                    }
                });
                if (!result)
                    return false;
                for (let key in obj2) {
                    if (!obj1.has(key))
                        return false;
                }
                return true;
            }
            else if (ul4._ismap(obj2)) {
                if (obj1 === obj2)
                    return true;
                if (obj1.size != obj2.size)
                    return false;
                let result = true;
                obj1.forEach(function (value, key) {
                    if (result) {
                        if (!obj2.has(key))
                            result = false;
                        else if (!ul4._eq(obj1.get(key), obj2.get(key)))
                            result = false;
                    }
                });
                return result;
            }
            else
                return false;
        }
        else if (ul4._isset(obj1)) {
            if (ul4._isset(obj2)) {
                if (obj1 === obj2)
                    return true;
                if (obj1.size != obj2.size)
                    return false;
                let result = true;
                obj1.forEach(function (value) {
                    if (result) {
                        if (!obj2.has(value))
                            result = false;
                    }
                });
                return result;
            }
            else
                return false;
        }
        else
            return obj1 === obj2;
    }
    ul4._eq = _eq;
    function _bound(value, upper) {
        if (value < 0)
            return 0;
        else if (value > upper)
            return upper;
        else
            return value;
    }
    ul4._bound = _bound;
    function _count(obj, sub, start = null, end = null) {
        if (start === null)
            start = 0;
        if (start < 0)
            start += obj.length;
        if (end === null)
            end = obj.length || 0;
        if (end < 0)
            end += obj.length;
        let isstr = ul4._isstr(obj);
        if (isstr && !sub.length) {
            if (end < 0 || start > obj.length || start > end)
                return 0;
            let result = end - start + 1;
            if (result > obj.length + 1)
                result = obj.length + 1;
            return result;
        }
        start = ul4._bound(start, obj.length);
        end = ul4._bound(end, obj.length);
        let count = 0;
        if (ul4._islist(obj)) {
            for (let i = start; i < end; ++i) {
                if (ul4._eq(obj[i], sub))
                    ++count;
            }
            return count;
        }
        else {
            let lastIndex = start;
            for (;;) {
                lastIndex = obj.indexOf(sub, lastIndex);
                if (lastIndex == -1)
                    break;
                if (lastIndex + sub.length > end)
                    break;
                ++count;
                lastIndex += sub.length;
            }
            return count;
        }
    }
    ul4._count = _count;
    ;
    function _isul4set(obj) {
        return (obj instanceof ul4._Set);
    }
    ul4._isul4set = _isul4set;
    function _isstr(obj) {
        return typeof (obj) === "string";
    }
    ul4._isstr = _isstr;
    function _iscolor(obj) {
        return false;
    }
    ul4._iscolor = _iscolor;
    function _isdate(obj) {
        return false;
    }
    ul4._isdate = _isdate;
    function _isdatetime(obj) {
        return false;
    }
    ul4._isdatetime = _isdatetime;
    function _istimedelta(obj) {
        return false;
    }
    ul4._istimedelta = _istimedelta;
    function _ismonthdelta(obj) {
        return false;
    }
    ul4._ismonthdelta = _ismonthdelta;
    function _islist(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }
    ul4._islist = _islist;
    function _ismap(obj) {
        return obj !== null && typeof (obj) === "object" && typeof (obj.__proto__) === "object" && obj.__proto__ === Map.prototype;
    }
    ul4._ismap = _ismap;
    function _isdict(obj) {
        return ul4._isobject(obj) || ul4._ismap(obj);
    }
    ul4._isdict = _isdict;
    function _isset(obj) {
        return Object.prototype.toString.call(obj) == "[object Set]";
    }
    ul4._isset = _isset;
    function _isobject(obj) {
        return Object.prototype.toString.call(obj) == "[object Object]" && typeof (obj.__type__) === "undefined" && !(obj instanceof ul4.Proto);
    }
    ul4._isobject = _isobject;
    function _isiter(obj) {
        return obj !== null && typeof (obj) === "object" && typeof (obj.next) === "function";
    }
    ul4._isiter = _isiter;
    function _repr(obj) {
        return ul4._repr_internal(obj, false);
    }
    ul4._repr = _repr;
    function _repr_internal(obj, ascii) {
        if (obj === null)
            return "None";
        else if (obj === false)
            return "False";
        else if (obj === true)
            return "True";
        else if (typeof (obj) === "string")
            return ul4._str_repr(obj, ascii);
        else if (typeof (obj) === "number")
            return "" + obj;
        else if (typeof (obj) === "function")
            if (obj._ul4_name || obj.name)
                return "<function " + (obj._ul4_name || obj.name) + ">";
            else
                return "<anonymous function>";
        else if (ul4._isdate(obj))
            return ul4._date_repr(obj, ascii);
        else if (ul4._isdatetime(obj))
            return ul4._datetime_repr(obj, ascii);
        else if (typeof (obj) === "undefined")
            return "<undefined>";
        else if (typeof (obj) === "object" && typeof (obj.__repr__) === "function")
            return obj.__repr__();
        else if (ul4._islist(obj))
            return ul4._list_repr(obj, ascii);
        else if (ul4._ismap(obj))
            return ul4._map_repr(obj, ascii);
        else if (ul4._isset(obj))
            return ul4._set_repr(obj, ascii);
        else if (ul4._isobject(obj))
            return ul4._object_repr(obj, ascii);
        return "?";
    }
    ul4._repr_internal = _repr_internal;
    function _object_repr(obj, ascii = false) {
        let v = [];
        v.push("{");
        let i = 0;
        for (let key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;
            if (i++)
                v.push(", ");
            v.push(ul4._repr_internal(key, ascii));
            v.push(": ");
            v.push(ul4._repr_internal(obj[key], ascii));
        }
        v.push("}");
        return v.join("");
    }
    ul4._object_repr = _object_repr;
    function _set_repr(obj, ascii = false) {
        let v = [];
        v.push("{");
        if (!obj.size)
            v.push("/");
        else {
            let i = 0;
            obj.forEach(function (value, key) {
                if (i++)
                    v.push(", ");
                v.push(ul4._repr_internal(value, ascii));
            });
        }
        v.push("}");
        return v.join("");
    }
    ul4._set_repr = _set_repr;
    function _map_repr(obj, ascii = false) {
        let v = [];
        v.push("{");
        let i = 0;
        obj.forEach(function (value, key) {
            if (i++)
                v.push(", ");
            v.push(ul4._repr_internal(key, ascii));
            v.push(": ");
            v.push(ul4._repr_internal(value, ascii));
        });
        v.push("}");
        return v.join("");
    }
    ul4._map_repr = _map_repr;
    function _list_repr(obj, ascii = false) {
        let v = [];
        v.push("[");
        for (let i = 0; i < obj.length; ++i) {
            if (i !== 0)
                v.push(", ");
            v.push(ul4._repr_internal(obj[i], ascii));
        }
        v.push("]");
        return v.join("");
    }
    ul4._list_repr = _list_repr;
    function _datetime_repr(obj, ascii = false) {
        let year = obj.getFullYear();
        let month = obj.getMonth() + 1;
        let day = obj.getDate();
        let hour = obj.getHours();
        let minute = obj.getMinutes();
        let second = obj.getSeconds();
        let ms = obj.getMilliseconds();
        let result = "@(" + year + "-" + ul4._lpad(month.toString(), "0", 2) + "-" + ul4._lpad(day.toString(), "0", 2) + "T";
        if (hour || minute || second || ms) {
            result += ul4._lpad(hour.toString(), "0", 2) + ":" + ul4._lpad(minute.toString(), "0", 2);
            if (second || ms) {
                result += ":" + ul4._lpad(second.toString(), "0", 2);
                if (ms)
                    result += "." + ul4._lpad(ms.toString(), "0", 3) + "000";
            }
        }
        result += ")";
        return result;
    }
    ul4._datetime_repr = _datetime_repr;
    function _date_repr(obj, ascii = false) {
        let date = obj._date;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let result = "@(" + year + "-" + ul4._lpad(month.toString(), "0", 2) + "-" + ul4._lpad(day.toString(), "0", 2) + ")";
        return result;
    }
    ul4._date_repr = _date_repr;
    function _str_repr(str, ascii = false) {
        let result = "";
        let squote = false, dquote = false;
        for (let c of str) {
            if (c == '"') {
                dquote = true;
                if (squote)
                    break;
            }
            else if (c == "'") {
                squote = true;
                if (dquote)
                    break;
            }
        }
        let quote = (squote && !dquote) ? '"' : "'";
        for (let c of str) {
            switch (c) {
                case '"':
                    result += (quote == c) ? '\\"' : c;
                    break;
                case "'":
                    result += (quote == c) ? "\\'" : c;
                    break;
                case "\\":
                    result += "\\\\";
                    break;
                case "\t":
                    result += "\\t";
                    break;
                case "\n":
                    result += "\\n";
                    break;
                case "\r":
                    result += "\\r";
                    break;
                default:
                    let code = c.charCodeAt(0);
                    let escape;
                    if (code < 32)
                        escape = 2;
                    else if (code < 0x7f)
                        escape = 0;
                    else if (!ascii && !/[\u007f-\u00a0\u00ad\u0378-\u0379\u0380-\u0383\u038b\u038d\u03a2\u0530\u0557-\u0558\u0560\u0588\u058b-\u058c\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u0605\u061c-\u061d\u06dd\u070e-\u070f\u074b-\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e-\u082f\u083f\u085c-\u085d\u085f-\u089f\u08b5-\u08e2\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bb\u09c5-\u09c6\u09c9-\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4-\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a3b\u0a3d\u0a43-\u0a46\u0a49-\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abb\u0ac6\u0aca\u0ace-\u0acf\u0ad1-\u0adf\u0ae4-\u0ae5\u0af2-\u0af8\u0afa-\u0b00\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3b\u0b45-\u0b46\u0b49-\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64-\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce-\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0bff\u0c04\u0c0d\u0c11\u0c29\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5b-\u0c5f\u0c64-\u0c65\u0c70-\u0c77\u0c80\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4-\u0ce5\u0cf0\u0cf3-\u0d00\u0d04\u0d0d\u0d11\u0d3b-\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5e\u0d64-\u0d65\u0d76-\u0d78\u0d80-\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0de5\u0df0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85-\u0e86\u0e89\u0e8b-\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8-\u0ea9\u0eac\u0eba\u0ebe-\u0ebf\u0ec5\u0ec7\u0ece-\u0ecf\u0eda-\u0edb\u0ee0-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6\u10c8-\u10cc\u10ce-\u10cf\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u135c\u137d-\u137f\u139a-\u139f\u13f6-\u13f7\u13fe-\u13ff\u1680\u169d-\u169f\u16f9-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de-\u17df\u17ea-\u17ef\u17fa-\u17ff\u180e-\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e-\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c-\u1a1d\u1a5f\u1a7d-\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aaf\u1abf-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1cbf\u1cc8-\u1ccf\u1cf7\u1cfa-\u1cff\u1df6-\u1dfb\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fc5\u1fd4-\u1fd5\u1fdc\u1ff0-\u1ff1\u1ff5\u1fff-\u200f\u2028-\u202f\u205f-\u206f\u2072-\u2073\u208f\u209d-\u209f\u20bf-\u20cf\u20f1-\u20ff\u218c-\u218f\u23fb-\u23ff\u2427-\u243f\u244b-\u245f\u2b74-\u2b75\u2b96-\u2b97\u2bba-\u2bbc\u2bc9\u2bd2-\u2beb\u2bf0-\u2bff\u2c2f\u2c5f\u2cf4-\u2cf8\u2d26\u2d28-\u2d2c\u2d2e-\u2d2f\u2d68-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e43-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u3000\u3040\u3097-\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fd6-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua6f8-\ua6ff\ua7ae-\ua7af\ua7b8-\ua7f6\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fe-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9ff\uaa37-\uaa3f\uaa4e-\uaa4f\uaa5a-\uaa5b\uaac3-\uaada\uaaf7-\uab00\uab07-\uab08\uab0f-\uab10\uab17-\uab1f\uab27\uab2f\uab66-\uab6f\uabee-\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\uf8ff\ufa6e-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfe-\ufdff\ufe1a-\ufe1f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd-\uff00\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9\uffdd-\uffdf\uffe7\uffef-\ufffb\ufffe-\uffff]/.test(c))
                        escape = 0;
                    else if (code <= 0xff)
                        escape = 2;
                    else if (code <= 0xffff)
                        escape = 4;
                    else
                        escape = 8;
                    if (escape === 0)
                        result += c;
                    else if (escape === 2)
                        result += "\\x" + ul4._lpad(code.toString(16), "0", 2);
                    else if (escape === 4)
                        result += "\\u" + ul4._lpad(code.toString(16), "0", 4);
                    else
                        result += "\\U" + ul4._lpad(code.toString(16), "0", 8);
                    break;
            }
        }
        return quote + result + quote;
    }
    ul4._str_repr = _str_repr;
    function _lpad(string, pad, len) {
        if (typeof (string) === "number")
            string = string.toString();
        while (string.length < len)
            string = pad + string;
        return string;
    }
    ul4._lpad = _lpad;
    function _type(obj) {
        if (obj === null)
            return "none";
        else if (obj === false || obj === true)
            return "bool";
        else if (typeof (obj) === "undefined")
            return "undefined";
        else if (typeof (obj) === "number")
            return Math.round(obj) == obj ? "int" : "float";
        else if (typeof (obj) === "function")
            return "function";
        else {
            if (typeof (obj.ul4type) === "function")
                return obj.ul4type();
            else
                return ul4.Protocol.get(obj).ul4type();
            return "";
        }
    }
    ul4._type = _type;
    function _rfind(obj, sub, start = null, end = null) {
        if (start === null)
            start = 0;
        if (end === null)
            end = obj.length;
        if (start < 0)
            start += obj.length;
        if (end < 0)
            end += obj.length;
        start = ul4._bound(start, obj.length);
        end = ul4._bound(end, obj.length);
        if (start !== 0 || end !== obj.length) {
            if (typeof (obj) == "string")
                obj = obj.substring(start, end);
            else
                obj = obj.slice(start, end);
        }
        let result = obj.lastIndexOf(sub);
        if (result !== -1)
            result += start;
        return result;
    }
    ul4._rfind = _rfind;
    function _iter(obj) {
        if (typeof (obj) === "string" || ul4._islist(obj)) {
            return {
                index: 0,
                next: function () {
                    if (this.index < obj.length)
                        return { value: obj[this.index++], done: false };
                    else
                        return { done: true };
                }
            };
        }
        else if (ul4._isiter(obj))
            return obj;
        else if (obj !== null && typeof (obj.__iter__) === "function")
            return obj.__iter__();
        else if (ul4._ismap(obj)) {
            let keys = [];
            obj.forEach(function (value, key) {
                keys.push(key);
            });
            return {
                index: 0,
                next: function () {
                    if (this.index >= keys.length)
                        return { done: true };
                    return { value: keys[this.index++], done: false };
                }
            };
        }
        else if (ul4._isset(obj)) {
            let values = [];
            obj.forEach(function (value, key) {
                values.push(value);
            });
            return {
                index: 0,
                next: function () {
                    if (this.index >= values.length)
                        return { done: true };
                    return { value: values[this.index++], done: false };
                }
            };
        }
        else if (ul4._isul4set(obj)) {
            return ul4._iter(obj.items);
        }
        else if (ul4._isobject(obj)) {
            let keys = [];
            for (let key in obj)
                keys.push(key);
            return {
                index: 0,
                next: function () {
                    if (this.index >= keys.length)
                        return { done: true };
                    return { value: keys[this.index++], done: false };
                }
            };
        }
        throw new ul4.TypeError(ul4._type(obj) + " object is not iterable");
    }
    ul4._iter = _iter;
    class PROTO {
    }
    ul4.PROTO = PROTO;
    class Proto {
        constructor() {
            this.__id__ = _nextid++;
        }
        ul4type() {
            return this.constructor.name;
        }
        __eq__(other) {
            return this === other;
        }
        __ne__(other) {
            return !this.__eq__(other);
        }
        __bool__() {
            return true;
        }
    }
    ul4.Proto = Proto;
    class Date extends Proto {
        constructor(year, month, day) {
            super();
            this._date = new _js_Date(year, month - 1, day);
        }
        ul4type() {
            return "date";
        }
        __repr__() {
            return '@(' + this.__str__() + ")";
        }
        __str__() {
            return ul4._lpad(this._date.getFullYear(), "0", 4) + "-" + ul4._lpad(this._date.getMonth() + 1, "0", 2) + "-" + ul4._lpad(this._date.getDate(), "0", 2);
        }
        __eq__(other) {
            if (other instanceof ul4.Date)
                return this._date.getTime() === other._date.getTime();
            return false;
        }
        __lt__(other) {
            if (other instanceof ul4.Date)
                return this._date < other._date;
            ul4._unorderable("<", this, other);
        }
        __le__(other) {
            if (other instanceof ul4.Date)
                return this._date <= other._date;
            ul4._unorderable("<=", this, other);
        }
        __gt__(other) {
            if (other instanceof ul4.Date)
                return this._date > other._date;
            ul4._unorderable(">", this, other);
        }
        __ge__(other) {
            if (other instanceof ul4.Date)
                return this._date >= other._date;
            ul4._unorderable(">=", this, other);
        }
        year() {
            return this._date.getFullYear();
        }
        month() {
            return this._date.getMonth() + 1;
        }
        day() {
            return this._date.getDate();
        }
    }
    ul4.Date = Date;
    class Signature extends Proto {
        constructor(...args) {
            super();
            this.args = [];
            this.argNames = {};
            this.remargs = null;
            this.remkwargs = null;
            let nextDefault = false;
            let lastArgname = null;
            for (let argName of args) {
                if (nextDefault) {
                    this.args.push({ name: lastArgname, defaultValue: argName });
                    this.argNames[lastArgname] = true;
                    nextDefault = false;
                }
                else {
                    if (argName.substr(argName.length - 1) === "=") {
                        lastArgname = argName.substr(0, argName.length - 1);
                        nextDefault = true;
                    }
                    else if (argName.substr(0, 2) === "**")
                        this.remkwargs = argName.substr(2);
                    else if (argName.substr(0, 1) === "*")
                        this.remargs = argName.substr(1);
                    else {
                        this.args.push({ name: argName });
                        this.argNames[argName] = true;
                    }
                }
            }
        }
        bindArray(name, args, kwargs) {
            let finalargs = [];
            let decname = name !== null ? name + "() " : "";
            for (let i = 0; i < this.args.length; ++i) {
                let arg = this.args[i];
                if (i < args.length) {
                    if (kwargs.hasOwnProperty(arg.name))
                        throw new ul4.ArgumentError(decname + "argument " + ul4._repr(arg.name) + " (position " + i + ") specified multiple times");
                    finalargs.push(args[i]);
                }
                else {
                    if (kwargs.hasOwnProperty(arg.name))
                        finalargs.push(kwargs[arg.name]);
                    else {
                        if (arg.hasOwnProperty("defaultValue"))
                            finalargs.push(arg.defaultValue);
                        else
                            throw new ul4.ArgumentError("required " + decname + "argument " + ul4._repr(arg.name) + " (position " + i + ") missing");
                    }
                }
            }
            if (this.remargs === null) {
                if (args.length > this.args.length) {
                    let prefix = name === null ? "expected" : name + "() expects";
                    throw new ul4.ArgumentError(prefix + " at most " + this.args.length + " positional argument" + (this.args.length != 1 ? "s" : "") + ", " + args.length + " given");
                }
            }
            else {
                finalargs.push(args.slice(this.args.length));
            }
            if (this.remkwargs === null) {
                for (let key in kwargs) {
                    if (!this.argNames[key]) {
                        if (name === null)
                            throw new ul4.ArgumentError("an argument named " + ul4._repr(key) + " isn't supported");
                        else
                            throw new ul4.ArgumentError(name + "() doesn't support an argument named " + ul4._repr(key));
                    }
                }
            }
            else {
                let remkwargs = helpers._emptymap();
                for (let key in kwargs) {
                    if (!this.argNames[key])
                        helpers._setmap(remkwargs, key, kwargs[key]);
                }
                finalargs.push(remkwargs);
            }
            return finalargs;
        }
    }
    ul4.Signature = Signature;
    class Protocol {
        static ul4type() {
            return Protocol.constructor.name;
        }
        static dir() {
        }
        static get(obj) {
            if (ul4._isstr(obj))
                return ul4.StrProtocol;
            else if (ul4._islist(obj))
                return ul4.ListProtocol;
            else if (ul4._isdate(obj))
                return ul4.DateProtocol;
            return ul4.Protocol;
        }
        static getattr(obj, attrname) {
            if (obj === null || obj === undefined)
                throw new ul4.AttributeError(obj, attrname);
            else if (typeof (obj.__getattr__) === "function")
                return obj.__getattr__(attrname);
            else if (this.attrs.has(attrname)) {
                let attr = this[attrname];
                let realattr = new Function("return function " + attr.name + " (...args: any[]) { return attr.apply(Protocol.attrs, [obj, ...args]); }");
                realattr._ul4_name = attr._ul4_name || attr.name;
                realattr._ul4_signature = attr._ul4_signature;
                realattr._ul4_needsobject = attr._ul4_needsobject;
                realattr._ul4_needscontext = attr._ul4_needscontext;
                return realattr;
            }
            else
                throw new ul4.AttributeError(obj, attrname);
        }
        static hasattr(obj, attrname) {
            if (obj === null || typeof (obj) === "undefined")
                return false;
            else if (typeof (obj.__getattr__) === "function") {
                try {
                    obj.__getattr__(attrname);
                    return true;
                }
                catch (exc) {
                    if (exc instanceof ul4.AttributeError && exc.obj === obj)
                        return false;
                    else
                        throw exc;
                }
            }
            else
                return this.has(attrname);
        }
    }
    Protocol.attrs = helpers._emptyset();
    ul4.Protocol = Protocol;
    class DateProtocol extends Protocol {
        static ul4type() {
            return "date";
        }
    }
    ul4.DateProtocol = DateProtocol;
    class ListProtocol extends Protocol {
        static ul4type() {
            return "list";
        }
        static append(obj, items) {
            for (let item of items)
                obj.push(item);
            return null;
        }
        static insert(obj, pos, items) {
            if (pos < 0)
                pos += obj.length;
            for (let item of items)
                obj.splice(pos++, 0, item);
            return null;
        }
        static pop(obj, pos) {
            if (pos < 0)
                pos += obj.length;
            let result = obj[pos];
            obj.splice(pos, 1);
            return result;
        }
        static count(obj, sub, start = null, end = null) {
            return ul4._count(obj, sub, start, end);
        }
        static find(obj, sub, start = null, end = null) {
            return ul4._find(obj, sub, start, end);
        }
        static rfind(obj, sub, start = null, end = null) {
            return ul4._rfind(obj, sub, start, end);
        }
    }
    ListProtocol.attrs = helpers._makeset("append", "insert", "pop", "count", "find", "rfind");
    ul4.ListProtocol = ListProtocol;
    ul4.expose(ul4.ListProtocol.append, ["*items"]);
    ul4.expose(ul4.ListProtocol.insert, ["pos", "*items"]);
    ul4.expose(ul4.ListProtocol.pop, ["pos=", -1]);
    ul4.expose(ul4.ListProtocol.count, ["sub", "start=", null, "end=", null]);
    ul4.expose(ul4.ListProtocol.find, ["sub", "start=", null, "end=", null]);
    ul4.expose(ul4.ListProtocol.rfind, ["sub", "start=", null, "end=", null]);
    class StrProtocol extends Protocol {
        static ul4type() {
            return "str";
        }
        static count(obj, sub, start = null, end = null) {
            return ul4._count(obj, sub, start, end);
        }
        static find(obj, sub, start = null, end = null) {
            return ul4._find(obj, sub, start, end);
        }
        static rfind(obj, sub, start = null, end = null) {
            return ul4._rfind(obj, sub, start, end);
        }
        static replace(obj, old, new_, count = null) {
            if (count === null)
                count = obj.length;
            let result = [];
            while (obj.length) {
                let pos = obj.indexOf(old);
                if (pos === -1 || !count--) {
                    result.push(obj);
                    break;
                }
                result.push(obj.substr(0, pos));
                result.push(new_);
                obj = obj.substr(pos + old.length);
            }
            return result.join("");
        }
        static strip(obj, chars = null) {
            chars = chars || " \r\n\t";
            if (typeof (chars) !== "string")
                throw new ul4.TypeError("strip() requires a string argument");
            while (obj && chars.indexOf(obj[0]) >= 0)
                obj = obj.substr(1);
            while (obj && chars.indexOf(obj[obj.length - 1]) >= 0)
                obj = obj.substr(0, obj.length - 1);
            return obj;
        }
        static lstrip(obj, chars = null) {
            chars = chars || " \r\n\t";
            if (typeof (chars) !== "string")
                throw new ul4.TypeError("lstrip() requires a string argument");
            while (obj && chars.indexOf(obj[0]) >= 0)
                obj = obj.substr(1);
            return obj;
        }
        static rstrip(obj, chars = null) {
            chars = chars || " \r\n\t";
            if (typeof (chars) !== "string")
                throw new ul4.TypeError("rstrip() requires a string argument");
            while (obj && chars.indexOf(obj[obj.length - 1]) >= 0)
                obj = obj.substr(0, obj.length - 1);
            return obj;
        }
        static split(obj, sep = null, count = null) {
            if (sep !== null && typeof (sep) !== "string")
                throw new ul4.TypeError("split() requires a string");
            if (count === null) {
                let result = obj.split(sep !== null ? sep : /[ \n\r\t]+/);
                if (sep === null) {
                    if (result.length && !result[0].length)
                        result.splice(0, 1);
                    if (result.length && !result[result.length - 1].length)
                        result.splice(-1);
                }
                return result;
            }
            else {
                if (sep !== null) {
                    let result = [];
                    while (obj.length) {
                        let pos = obj.indexOf(sep);
                        if (pos === -1 || !count--) {
                            result.push(obj);
                            break;
                        }
                        result.push(obj.substr(0, pos));
                        obj = obj.substr(pos + sep.length);
                    }
                    return result;
                }
                else {
                    let result = [];
                    while (obj.length) {
                        obj = ul4.StrProtocol.lstrip(obj, null);
                        let part;
                        if (!count--)
                            part = obj;
                        else
                            part = obj.split(/[ \n\r\t]+/, 1)[0];
                        if (part.length)
                            result.push(part);
                        obj = obj.substr(part.length);
                    }
                    return result;
                }
            }
        }
        static rsplit(obj, sep = null, count = null) {
            if (sep !== null && typeof (sep) !== "string")
                throw new ul4.TypeError("rsplit() requires a string as second argument");
            if (count === null) {
                let result = obj.split(sep !== null ? sep : /[ \n\r\t]+/);
                if (sep === null) {
                    if (result.length && !result[0].length)
                        result.splice(0, 1);
                    if (result.length && !result[result.length - 1].length)
                        result.splice(-1);
                }
                return result;
            }
            else {
                if (sep !== null) {
                    let result = [];
                    while (obj.length) {
                        let pos = obj.lastIndexOf(sep);
                        if (pos === -1 || !count--) {
                            result.unshift(obj);
                            break;
                        }
                        result.unshift(obj.substr(pos + sep.length));
                        obj = obj.substr(0, pos);
                    }
                    return result;
                }
                else {
                    let result = [];
                    while (obj.length) {
                        obj = ul4.StrProtocol.rstrip(obj);
                        let part;
                        if (!count--)
                            part = obj;
                        else {
                            part = obj.split(/[ \n\r\t]+/);
                            part = part[part.length - 1];
                        }
                        if (part.length)
                            result.unshift(part);
                        obj = obj.substr(0, obj.length - part.length);
                    }
                    return result;
                }
            }
        }
        static splitlines(obj, keepends = false) {
            let pos = 0;
            let lookingAtLineEnd = function lookingAtLineEnd() {
                let c = obj[pos];
                if (c === '\n' || c == '\u000B' || c == '\u000C' || c == '\u001C' || c == '\u001D' || c == '\u001E' || c == '\u0085' || c == '\u2028' || c == '\u2029')
                    return 1;
                if (c === '\r') {
                    if (pos == length - 1)
                        return 1;
                    if (obj[pos + 1] === '\n')
                        return 2;
                    return 1;
                }
                return 0;
            };
            let result = [], length = obj.length;
            for (let pos = 0, startpos = 0;;) {
                if (pos >= length) {
                    if (startpos != pos)
                        result.push(obj.substring(startpos));
                    return result;
                }
                let lineendlen = lookingAtLineEnd();
                if (!lineendlen)
                    ++pos;
                else {
                    let endpos = pos + (keepends ? lineendlen : 0);
                    result.push(obj.substring(startpos, endpos));
                    pos += lineendlen;
                    startpos = pos;
                }
            }
        }
        static lower(obj) {
            return obj.toLowerCase();
        }
        static upper(obj) {
            return obj.toUpperCase();
        }
        static capitalize(obj) {
            if (obj.length)
                obj = obj[0].toUpperCase() + obj.slice(1).toLowerCase();
            return obj;
        }
        static join(obj, iterable) {
            let resultlist = [];
            for (let iter = ul4._iter(iterable);;) {
                let item = iter.next();
                if (item.done)
                    break;
                resultlist.push(item.value);
            }
            return resultlist.join(obj);
        }
        static startswith(obj, prefix) {
            if (typeof (prefix) === "string")
                return obj.substr(0, prefix.length) === prefix;
            else if (ul4._islist(prefix)) {
                for (let singlepre of prefix) {
                    if (obj.substr(0, singlepre.length) === singlepre)
                        return true;
                }
                return false;
            }
            else
                throw new ul4.TypeError("startswith() argument must be string");
        }
        static endswith(obj, suffix) {
            if (typeof (suffix) === "string")
                return obj.substr(obj.length - suffix.length) === suffix;
            else if (ul4._islist(suffix)) {
                for (let singlesuf of suffix) {
                    if (obj.substr(obj.length - singlesuf.length) === singlesuf)
                        return true;
                }
                return false;
            }
            else
                throw new ul4.TypeError("endswith() argument must be string or list of strings");
        }
    }
    StrProtocol.attrs = helpers._makeset("split", "rsplit", "splitlines", "strip", "lstrip", "rstrip", "upper", "lower", "capitalize", "startswith", "endswith", "replace", "count", "find", "rfind", "join");
    ul4.StrProtocol = StrProtocol;
    ul4.expose(ul4.StrProtocol.count, ["sub", "start=", null, "end=", null]);
    ul4.expose(ul4.StrProtocol.find, ["sub", "start=", null, "end=", null]);
    ul4.expose(ul4.StrProtocol.rfind, ["sub", "start=", null, "end=", null]);
    ul4.expose(ul4.StrProtocol.replace, ["old", "new", "count=", null]);
    ul4.expose(ul4.StrProtocol.strip, ["chars=", null]);
    ul4.expose(ul4.StrProtocol.lstrip, ["chars=", null]);
    ul4.expose(ul4.StrProtocol.rstrip, ["chars=", null]);
    ul4.expose(ul4.StrProtocol.split, ["sep=", null, "count=", null]);
    ul4.expose(ul4.StrProtocol.rsplit, ["sep=", null, "count=", null]);
    ul4.expose(ul4.StrProtocol.splitlines, ["keepends=", false]);
    ul4.expose(ul4.StrProtocol.lower, []);
    ul4.expose(ul4.StrProtocol.upper, []);
    ul4.expose(ul4.StrProtocol.capitalize, []);
    ul4.expose(ul4.StrProtocol.join, ["iterable"]);
    ul4.expose(ul4.StrProtocol.startswith, ["prefix"]);
    ul4.expose(ul4.StrProtocol.endswith, ["suffix"]);
    class _Set {
        constructor() {
            this.__type__ = "set";
        }
        add(...items) {
            for (let item of items)
                this.items[item] = true;
        }
        has(item) {
            return this.items[item] ? true : false;
        }
        __getattr__(attrname) {
            let self = this;
            switch (attrname) {
                case "add":
                    return ul4.expose(["*items"], function add(items) { self.add(...items); });
                default:
                    throw new ul4.AttributeError(this, attrname);
            }
        }
        __contains__(item) {
            return this.items[item] || false;
        }
        __bool__() {
            for (let item in this.items) {
                if (!this.items.hasOwnProperty(item))
                    continue;
                return true;
            }
            return false;
        }
        __repr__() {
            let v = [];
            v.push("{");
            let i = 0;
            for (let item in this.items) {
                if (!this.items.hasOwnProperty(item))
                    continue;
                if (i++)
                    v.push(", ");
                v.push(ul4._repr(item));
            }
            if (!i)
                v.push("/");
            v.push("}");
            return v.join("");
        }
        __eq__(other) {
            if (ul4._isset(other)) {
                let count = 0;
                for (let item in this.items) {
                    if (!other.has(item))
                        return false;
                    ++count;
                }
                return other.size == count;
            }
            else if (ul4._isul4set(other)) {
                let count = 0;
                for (let item in this.items) {
                    if (!other[item])
                        return false;
                    ++count;
                }
                for (let item in other.items)
                    --count;
                return count == 0;
            }
            else
                return false;
        }
        __le__(other) {
            if (ul4._isset(other)) {
                let count = 0;
                for (let item in this.items) {
                    if (!other.has(item))
                        return false;
                }
                return true;
            }
            else if (ul4._isul4set(other)) {
                let count = 0;
                for (let item in this.items) {
                    if (!other.items[item])
                        return false;
                }
                return true;
            }
            else
                ul4._unorderable("<", this, other);
        }
        __ge__(other) {
            if (ul4._isset(other)) {
                let result = true;
                other.forEach(function (value) {
                    if (!other.items[value])
                        result = false;
                });
                return result;
            }
            else if (ul4._isul4set(other)) {
                let count = 0;
                for (let item in other.items) {
                    if (!this.items[item])
                        return false;
                }
                return true;
            }
            else
                ul4._unorderable("<=", this, other);
        }
    }
    ul4._Set = _Set;
    class slice {
        constructor(start, stop) {
            this.start = start;
            this.stop = stop;
        }
    }
    ul4.slice = slice;
    class Exception extends Error {
        constructor(message) {
            super(message);
            this.name = "UL4 Exception";
        }
        __getattr__(attrname) {
            switch (attrname) {
                case "cause":
                    return this.cause;
                default:
                    throw new ul4.AttributeError(this, attrname);
            }
        }
    }
    ul4.Exception = Exception;
    class ArgumentError extends Exception {
    }
    ul4.ArgumentError = ArgumentError;
    class TypeError extends Exception {
    }
    ul4.TypeError = TypeError;
    ;
    class AttributeError extends Exception {
        constructor(obj, attrname) {
            super("object of type " + ul4._type(obj) + " has no attribute " + ul4._repr(attrname));
            this.obj = obj;
            this.attrname = attrname;
        }
    }
    ul4.AttributeError = AttributeError;
    class ValueError extends ul4.Exception {
    }
    ul4.ValueError = ValueError;
    ;
})(ul4 || (ul4 = {}));
export var ul4on;
(function (ul4on) {
    let _registry = {};
    function register(name, f) {
        f.prototype.ul4onname = name;
        _registry[name] = f;
    }
    ul4on.register = register;
    function dumps(obj, indent) {
        let encoder = new Encoder(indent);
        encoder.dump(obj);
        return encoder.finish();
    }
    ul4on.dumps = dumps;
    function loads(data, registry = null) {
        let decoder = new Decoder(data, registry);
        return decoder.load();
    }
    ul4on.loads = loads;
    class Encoder {
        constructor(indent = null) {
            this.data = [];
            this._level = 0;
            this._strings2index = {};
            this._ids2index = {};
            this._backrefs = 0;
        }
        _line(line, ...args) {
            if (this.indent !== null) {
                for (let i = 0; i < this._level; ++i)
                    this.data.push(this.indent);
            }
            else {
                if (this.data.length)
                    this.data.push(" ");
            }
            this.data.push(line);
            if (args.length) {
                let oldindent = this.indent;
                this.indent = null;
                for (let arg of args)
                    this.dump(arg);
                this.indent = oldindent;
            }
            if (this.indent !== null)
                this.data.push("\n");
        }
        finish() {
            return this.data.join("");
        }
        dump(obj) {
            if (obj === null) {
                this._line("n");
            }
            else if (typeof (obj) === "boolean") {
                this._line(obj ? "bT" : "bF");
            }
            else if (typeof (obj) === "number") {
                let type = (Math.round(obj) == obj) ? "i" : "f";
                this._line(type + obj);
            }
            else if (typeof (obj) === "string") {
                let index = this._strings2index[obj];
                if (typeof (index) !== "undefined") {
                    this._line("^" + index);
                }
                else {
                    this._strings2index[obj] = this._backrefs++;
                    let dump = ul4._str_repr(obj).replace("<", "\\x3c");
                    this._line("S" + dump);
                }
            }
            else if (ul4._iscolor(obj))
                this._line("c", obj.r(), obj.g(), obj.b(), obj.a());
            else if (ul4._isdate(obj))
                this._line("x", obj.year(), obj.month(), obj.day());
            else if (ul4._isdatetime(obj))
                this._line("z", obj.getFullYear(), obj.getMonth() + 1, obj.getDate(), obj.getHours(), obj.getMinutes(), obj.getSeconds(), obj.getMilliseconds() * 1000);
            else if (ul4._istimedelta(obj))
                this._line("t", obj.days(), obj.seconds(), obj.microseconds());
            else if (ul4._ismonthdelta(obj))
                this._line("m", obj.months());
            else if (obj instanceof ul4.slice)
                this._line("r", obj.start, obj.stop);
            else if (obj.ul4onname && obj.ul4ondump) {
                if (obj.__id__) {
                    let index = this._ids2index[obj.__id__];
                    if (typeof (index) != "undefined") {
                        this._line("^" + index);
                        return;
                    }
                    this._ids2index[obj.__id__] = this._backrefs++;
                }
                this._line("O", obj.ul4onname);
                ++this._level;
                obj.ul4ondump(this);
                --this._level;
                this._line(")");
            }
            else if (ul4._islist(obj)) {
                this._line("l");
                ++this._level;
                for (let item of obj)
                    this.dump(item);
                --this._level;
                this._line("]");
            }
            else if (ul4._ismap(obj)) {
                this._line("e");
                ++this._level;
                for (let [key, value] of obj.entries()) {
                    this.dump(key);
                    this.dump(value);
                }
                --this._level;
                this._line("}");
            }
            else if (ul4._isdict(obj)) {
                this._line("d");
                ++this._level;
                for (let key in obj) {
                    this.dump(key);
                    this.dump(obj[key]);
                }
                --this._level;
                this._line("}");
            }
            else if (ul4._isset(obj)) {
                this._line("y");
                ++this._level;
                for (let item of obj.values())
                    this.dump(item);
                --this._level;
                this._line("}");
            }
            else
                throw new ul4.ValueError("can't create UL4ON dump of object " + ul4._repr(obj));
        }
    }
    ul4on.Encoder = Encoder;
    class Decoder {
        constructor(data, registry = null) {
            this.data = data || null;
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