!function(t,u){"object"==typeof exports&&"undefined"!=typeof module?u(exports):"function"==typeof define&&define.amd?define(["exports"],u):u(t.ul4Lib={})}(this,function(p){"use strict";var n,g,o,t,u,v=(n=function(t,u){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,u){t.__proto__=u}||function(t,u){for(var e in u)u.hasOwnProperty(e)&&(t[e]=u[e])})(t,u)},function(t,u){function e(){this.constructor=t}n(t,u),t.prototype=null===u?Object.create(u):(e.prototype=u.prototype,new e)}),y=Date;o=g||(g={}),t="function"==typeof Map&&"function"==typeof Map.prototype.forEach,u="function"==typeof Set&&"function"==typeof Set.prototype.forEach,o._setmap=t?function(t,u,e){t.set(u,e)}:function(t,u,e){t[u]=e},o._emptymap=t?function(){return new Map}:function(){return{}},o._emptyset=u?function(){return new Set}:function(){return new p.ul4._Set},o._makeset=function(){for(var t=[],u=0;u<arguments.length;u++)t[u]=arguments[u];for(var e=o._emptymap(),n=0,r=t;n<r.length;n++){var i=r[n];e.add(i)}return e},function(d){var u=1;d._unorderable=function(t,u,e){throw new d.TypeError("unorderable types: "+d._type(u)+" "+t+" "+d._type(e))},d.expose=function(t,u,e){var n;(e=e||{}).name&&(t._ul4_name=e.name),d._islist(u)&&(u=new((n=d.Signature).bind.apply(n,[void 0].concat(u)))),t._ul4_signature=u,t._ul4_needsobject=e.needsobject||!1,t._ul4_needscontext=e.needscontext||!1},d._find=function(t,u,e,n){void 0===e&&(e=null),void 0===n&&(n=null),null===e&&(e=0),null===n&&(n=t.length||0),e<0&&(e+=t.length),n<0&&(n+=t.length),e=d._bound(e,t.length),n=d._bound(n,t.length),0===e&&n===t.length||(t="string"==typeof t?t.substring(e,n):t.slice(e,n));var r=t.indexOf(u);return-1!==r&&(r+=e),r},d._eq=function(e,n){var t=["boolean","number"];if(e&&"function"==typeof e.__eq__)return e.__eq__(n);if(n&&"function"==typeof n.__eq__)return n.__eq__(e);if(null===e)return null===n;if(-1!=t.indexOf(typeof e))return-1!=t.indexOf(typeof n)&&e==n;if("string"==typeof e)return"string"==typeof n&&e==n;if(d._isdatetime(e))return!!d._isdatetime(n)&&e.getTime()==n.getTime();if(d._islist(e)){if(d._islist(n)){if(e===n)return!0;if(e.length!=n.length)return!1;for(var u=0;u<e.length;++u)if(!d._eq(e[u],n[u]))return!1;return!0}return!1}if(d._isobject(e)){if(d._isobject(n)){if(e===n)return!0;for(var r in e){if(!n.hasOwnProperty(r))return!1;if(!d._eq(e[r],n[r]))return!1}for(var r in n)if(!e.hasOwnProperty(r))return!1;return!0}if(d._ismap(n)){for(var r in e){if(!n.has(r))return!1;if(!d._eq(e[r],n.get(r)))return!1}var i=!0;return n.forEach(function(t,u){e.hasOwnProperty(u)||(i=!1)}),i}return!1}if(d._ismap(e)){if(d._isobject(n)){var o=!0;if(e.forEach(function(t,u){o&&(n.hasOwnProperty(u)&&d._eq(e.get(u),n[u])||(o=!1))}),!o)return!1;for(var r in n)if(!e.has(r))return!1;return!0}if(d._ismap(n)){if(e===n)return!0;if(e.size!=n.size)return!1;var f=!0;return e.forEach(function(t,u){f&&(n.has(u)&&d._eq(e.get(u),n.get(u))||(f=!1))}),f}return!1}if(d._isset(e)){if(d._isset(n)){if(e===n)return!0;if(e.size!=n.size)return!1;var s=!0;return e.forEach(function(t){s&&(n.has(t)||(s=!1))}),s}return!1}return e===n},d._bound=function(t,u){return t<0?0:u<t?u:t},d._count=function(t,u,e,n){if(void 0===e&&(e=null),void 0===n&&(n=null),null===e&&(e=0),e<0&&(e+=t.length),null===n&&(n=t.length||0),n<0&&(n+=t.length),d._isstr(t)&&!u.length){if(n<0||e>t.length||n<e)return 0;var r=n-e+1;return r>t.length+1&&(r=t.length+1),r}e=d._bound(e,t.length),n=d._bound(n,t.length);var i=0;if(d._islist(t)){for(var o=e;o<n;++o)d._eq(t[o],u)&&++i;return i}for(var f=e;-1!=(f=t.indexOf(u,f))&&!(f+u.length>n);)++i,f+=u.length;return i},d._isul4set=function(t){return t instanceof d._Set},d._isstr=function(t){return"string"==typeof t},d._iscolor=function(t){return!1},d._isdate=function(t){return!1},d._isdatetime=function(t){return!1},d._istimedelta=function(t){return!1},d._ismonthdelta=function(t){return!1},d._islist=function(t){return"[object Array]"==Object.prototype.toString.call(t)},d._ismap=function(t){return null!==t&&"object"==typeof t&&"object"==typeof t.__proto__&&t.__proto__===Map.prototype},d._isdict=function(t){return d._isobject(t)||d._ismap(t)},d._isset=function(t){return"[object Set]"==Object.prototype.toString.call(t)},d._isobject=function(t){return"[object Object]"==Object.prototype.toString.call(t)&&void 0===t.__type__&&!(t instanceof d.Proto)},d._isiter=function(t){return null!==t&&"object"==typeof t&&"function"==typeof t.next},d._repr=function(t){return d._repr_internal(t,!1)},d._repr_internal=function(t,u){return null===t?"None":!1===t?"False":!0===t?"True":"string"==typeof t?d._str_repr(t,u):"number"==typeof t?""+t:"function"==typeof t?t._ul4_name||t.name?"<function "+(t._ul4_name||t.name)+">":"<anonymous function>":d._isdate(t)?d._date_repr(t,u):d._isdatetime(t)?d._datetime_repr(t,u):void 0===t?"<undefined>":"object"==typeof t&&"function"==typeof t.__repr__?t.__repr__():d._islist(t)?d._list_repr(t,u):d._ismap(t)?d._map_repr(t,u):d._isset(t)?d._set_repr(t,u):d._isobject(t)?d._object_repr(t,u):"?"},d._object_repr=function(t,u){void 0===u&&(u=!1);var e=[];e.push("{");var n=0;for(var r in t)t.hasOwnProperty(r)&&(n++&&e.push(", "),e.push(d._repr_internal(r,u)),e.push(": "),e.push(d._repr_internal(t[r],u)));return e.push("}"),e.join("")},d._set_repr=function(t,e){void 0===e&&(e=!1);var n=[];if(n.push("{"),t.size){var r=0;t.forEach(function(t,u){r++&&n.push(", "),n.push(d._repr_internal(t,e))})}else n.push("/");return n.push("}"),n.join("")},d._map_repr=function(t,e){void 0===e&&(e=!1);var n=[];n.push("{");var r=0;return t.forEach(function(t,u){r++&&n.push(", "),n.push(d._repr_internal(u,e)),n.push(": "),n.push(d._repr_internal(t,e))}),n.push("}"),n.join("")},d._list_repr=function(t,u){void 0===u&&(u=!1);var e=[];e.push("[");for(var n=0;n<t.length;++n)0!==n&&e.push(", "),e.push(d._repr_internal(t[n],u));return e.push("]"),e.join("")},d._datetime_repr=function(t,u){void 0===u&&(u=!1);var e=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),i=t.getHours(),o=t.getMinutes(),f=t.getSeconds(),s=t.getMilliseconds(),a="@("+e+"-"+d._lpad(n.toString(),"0",2)+"-"+d._lpad(r.toString(),"0",2)+"T";return(i||o||f||s)&&(a+=d._lpad(i.toString(),"0",2)+":"+d._lpad(o.toString(),"0",2),(f||s)&&(a+=":"+d._lpad(f.toString(),"0",2),s&&(a+="."+d._lpad(s.toString(),"0",3)+"000"))),a+=")"},d._date_repr=function(t,u){void 0===u&&(u=!1);var e=t._date,n=e.getFullYear(),r=e.getMonth()+1,i=e.getDate();return"@("+n+"-"+d._lpad(r.toString(),"0",2)+"-"+d._lpad(i.toString(),"0",2)+")"},d._str_repr=function(t,u){void 0===u&&(u=!1);for(var e="",n=!1,r=!1,i=0,o=t;i<o.length;i++)if('"'==(l=o[i])){if(r=!0,n)break}else if("'"==l&&(n=!0,r))break;for(var f=n&&!r?'"':"'",s=0,a=t;s<a.length;s++){var l;switch(l=a[s]){case'"':e+=f==l?'\\"':l;break;case"'":e+=f==l?"\\'":l;break;case"\\":e+="\\\\";break;case"\t":e+="\\t";break;case"\n":e+="\\n";break;case"\r":e+="\\r";break;default:var c=l.charCodeAt(0),_=void 0;e+=0==(_=c<32?2:c<127?0:u||/[\u007f-\u00a0\u00ad\u0378-\u0379\u0380-\u0383\u038b\u038d\u03a2\u0530\u0557-\u0558\u0560\u0588\u058b-\u058c\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u0605\u061c-\u061d\u06dd\u070e-\u070f\u074b-\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e-\u082f\u083f\u085c-\u085d\u085f-\u089f\u08b5-\u08e2\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bb\u09c5-\u09c6\u09c9-\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4-\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a3b\u0a3d\u0a43-\u0a46\u0a49-\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abb\u0ac6\u0aca\u0ace-\u0acf\u0ad1-\u0adf\u0ae4-\u0ae5\u0af2-\u0af8\u0afa-\u0b00\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3b\u0b45-\u0b46\u0b49-\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64-\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce-\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0bff\u0c04\u0c0d\u0c11\u0c29\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5b-\u0c5f\u0c64-\u0c65\u0c70-\u0c77\u0c80\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4-\u0ce5\u0cf0\u0cf3-\u0d00\u0d04\u0d0d\u0d11\u0d3b-\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5e\u0d64-\u0d65\u0d76-\u0d78\u0d80-\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0de5\u0df0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85-\u0e86\u0e89\u0e8b-\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8-\u0ea9\u0eac\u0eba\u0ebe-\u0ebf\u0ec5\u0ec7\u0ece-\u0ecf\u0eda-\u0edb\u0ee0-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6\u10c8-\u10cc\u10ce-\u10cf\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u135c\u137d-\u137f\u139a-\u139f\u13f6-\u13f7\u13fe-\u13ff\u1680\u169d-\u169f\u16f9-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de-\u17df\u17ea-\u17ef\u17fa-\u17ff\u180e-\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e-\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c-\u1a1d\u1a5f\u1a7d-\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aaf\u1abf-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1cbf\u1cc8-\u1ccf\u1cf7\u1cfa-\u1cff\u1df6-\u1dfb\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fc5\u1fd4-\u1fd5\u1fdc\u1ff0-\u1ff1\u1ff5\u1fff-\u200f\u2028-\u202f\u205f-\u206f\u2072-\u2073\u208f\u209d-\u209f\u20bf-\u20cf\u20f1-\u20ff\u218c-\u218f\u23fb-\u23ff\u2427-\u243f\u244b-\u245f\u2b74-\u2b75\u2b96-\u2b97\u2bba-\u2bbc\u2bc9\u2bd2-\u2beb\u2bf0-\u2bff\u2c2f\u2c5f\u2cf4-\u2cf8\u2d26\u2d28-\u2d2c\u2d2e-\u2d2f\u2d68-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e43-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u3000\u3040\u3097-\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fd6-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua6f8-\ua6ff\ua7ae-\ua7af\ua7b8-\ua7f6\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fe-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9ff\uaa37-\uaa3f\uaa4e-\uaa4f\uaa5a-\uaa5b\uaac3-\uaada\uaaf7-\uab00\uab07-\uab08\uab0f-\uab10\uab17-\uab1f\uab27\uab2f\uab66-\uab6f\uabee-\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\uf8ff\ufa6e-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfe-\ufdff\ufe1a-\ufe1f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd-\uff00\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9\uffdd-\uffdf\uffe7\uffef-\ufffb\ufffe-\uffff]/.test(l)?c<=255?2:c<=65535?4:8:0)?l:2===_?"\\x"+d._lpad(c.toString(16),"0",2):4===_?"\\u"+d._lpad(c.toString(16),"0",4):"\\U"+d._lpad(c.toString(16),"0",8)}}return f+e+f},d._lpad=function(t,u,e){for("number"==typeof t&&(t=t.toString());t.length<e;)t=u+t;return t},d._type=function(t){return null===t?"none":!1===t||!0===t?"bool":void 0===t?"undefined":"number"==typeof t?Math.round(t)==t?"int":"float":"function"==typeof t?"function":"function"==typeof t.ul4type?t.ul4type():d.Protocol.get(t).ul4type()},d._rfind=function(t,u,e,n){void 0===e&&(e=null),void 0===n&&(n=null),null===e&&(e=0),null===n&&(n=t.length),e<0&&(e+=t.length),n<0&&(n+=t.length),e=d._bound(e,t.length),n=d._bound(n,t.length),0===e&&n===t.length||(t="string"==typeof t?t.substring(e,n):t.slice(e,n));var r=t.lastIndexOf(u);return-1!==r&&(r+=e),r},d._iter=function(t){if("string"==typeof t||d._islist(t))return{index:0,next:function(){return this.index<t.length?{value:t[this.index++],done:!1}:{done:!0}}};if(d._isiter(t))return t;if(null!==t&&"function"==typeof t.__iter__)return t.__iter__();if(d._ismap(t)){var e=[];return t.forEach(function(t,u){e.push(u)}),{index:0,next:function(){return this.index>=e.length?{done:!0}:{value:e[this.index++],done:!1}}}}if(d._isset(t)){var n=[];return t.forEach(function(t,u){n.push(t)}),{index:0,next:function(){return this.index>=n.length?{done:!0}:{value:n[this.index++],done:!1}}}}if(d._isul4set(t))return d._iter(t.items);if(d._isobject(t)){var u=[];for(var r in t)u.push(r);return{index:0,next:function(){return this.index>=u.length?{done:!0}:{value:u[this.index++],done:!1}}}}throw new d.TypeError(d._type(t)+" object is not iterable")};var t=function(){};d.PROTO=t;var e=function(){function t(){this.__id__=u++}return t.prototype.ul4type=function(){return this.constructor.name},t.prototype.__eq__=function(t){return this===t},t.prototype.__ne__=function(t){return!this.__eq__(t)},t.prototype.__bool__=function(){return!0},t}(),n=function(r){function t(t,u,e){var n=r.call(this)||this;return n._date=new y(t,u-1,e),n}return v(t,r),t.prototype.ul4type=function(){return"date"},t.prototype.__repr__=function(){return"@("+this.__str__()+")"},t.prototype.__str__=function(){return d._lpad(this._date.getFullYear(),"0",4)+"-"+d._lpad(this._date.getMonth()+1,"0",2)+"-"+d._lpad(this._date.getDate(),"0",2)},t.prototype.__eq__=function(t){return t instanceof d.Date&&this._date.getTime()===t._date.getTime()},t.prototype.__lt__=function(t){if(t instanceof d.Date)return this._date<t._date;d._unorderable("<",this,t)},t.prototype.__le__=function(t){if(t instanceof d.Date)return this._date<=t._date;d._unorderable("<=",this,t)},t.prototype.__gt__=function(t){if(t instanceof d.Date)return this._date>t._date;d._unorderable(">",this,t)},t.prototype.__ge__=function(t){if(t instanceof d.Date)return this._date>=t._date;d._unorderable(">=",this,t)},t.prototype.year=function(){return this._date.getFullYear()},t.prototype.month=function(){return this._date.getMonth()+1},t.prototype.day=function(){return this._date.getDate()},t}(d.Proto=e);d.Date=n;var r=function(s){function t(){for(var t=[],u=0;u<arguments.length;u++)t[u]=arguments[u];var e=s.call(this)||this;e.args=[],e.argNames={},e.remargs=null;for(var n=!1,r=e.remkwargs=null,i=0,o=t;i<o.length;i++){var f=o[i];n?(e.args.push({name:r,defaultValue:f}),n=!(e.argNames[r]=!0)):"="===f.substr(f.length-1)?(r=f.substr(0,f.length-1),n=!0):"**"===f.substr(0,2)?e.remkwargs=f.substr(2):"*"===f.substr(0,1)?e.remargs=f.substr(1):(e.args.push({name:f}),e.argNames[f]=!0)}return e}return v(t,s),t.prototype.bindArray=function(t,u,e){for(var n=[],r=null!==t?t+"() ":"",i=0;i<this.args.length;++i){var o=this.args[i];if(i<u.length){if(e.hasOwnProperty(o.name))throw new d.ArgumentError(r+"argument "+d._repr(o.name)+" (position "+i+") specified multiple times");n.push(u[i])}else if(e.hasOwnProperty(o.name))n.push(e[o.name]);else{if(!o.hasOwnProperty("defaultValue"))throw new d.ArgumentError("required "+r+"argument "+d._repr(o.name)+" (position "+i+") missing");n.push(o.defaultValue)}}if(null===this.remargs){if(u.length>this.args.length){var f=null===t?"expected":t+"() expects";throw new d.ArgumentError(f+" at most "+this.args.length+" positional argument"+(1!=this.args.length?"s":"")+", "+u.length+" given")}}else n.push(u.slice(this.args.length));if(null===this.remkwargs){for(var s in e)if(!this.argNames[s])throw null===t?new d.ArgumentError("an argument named "+d._repr(s)+" isn't supported"):new d.ArgumentError(t+"() doesn't support an argument named "+d._repr(s))}else{var a=g._emptymap();for(var s in e)this.argNames[s]||g._setmap(a,s,e[s]);n.push(a)}return n},t}(e);d.Signature=r;var i=function(){function t(){}return t.ul4type=function(){return t.constructor.name},t.dir=function(){},t.get=function(t){return d._isstr(t)?d.StrProtocol:d._islist(t)?d.ListProtocol:d._isdate(t)?d.DateProtocol:d.Protocol},t.getattr=function(t,u){if(null==t)throw new d.AttributeError(t,u);if("function"==typeof t.__getattr__)return t.__getattr__(u);if(this.attrs.has(u)){var e=this[u],n=new Function("return function "+e.name+" (...args: any[]) { return attr.apply(Protocol.attrs, [obj, ...args]); }");return n._ul4_name=e._ul4_name||e.name,n._ul4_signature=e._ul4_signature,n._ul4_needsobject=e._ul4_needsobject,n._ul4_needscontext=e._ul4_needscontext,n}throw new d.AttributeError(t,u)},t.hasattr=function(u,t){if(null==u)return!1;if("function"!=typeof u.__getattr__)return this.has(t);try{return u.__getattr__(t),!0}catch(t){if(t instanceof d.AttributeError&&t.obj===u)return!1;throw t}},t.attrs=g._emptyset(),t}(),o=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u.ul4type=function(){return"date"},u}(d.Protocol=i);d.DateProtocol=o;var f=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u.ul4type=function(){return"list"},u.append=function(t,u){for(var e=0,n=u;e<n.length;e++){var r=n[e];t.push(r)}return null},u.insert=function(t,u,e){u<0&&(u+=t.length);for(var n=0,r=e;n<r.length;n++){var i=r[n];t.splice(u++,0,i)}return null},u.pop=function(t,u){u<0&&(u+=t.length);var e=t[u];return t.splice(u,1),e},u.count=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._count(t,u,e,n)},u.find=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._find(t,u,e,n)},u.rfind=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._rfind(t,u,e,n)},u.attrs=g._makeset("append","insert","pop","count","find","rfind"),u}(i);d.ListProtocol=f,d.expose(d.ListProtocol.append,["*items"]),d.expose(d.ListProtocol.insert,["pos","*items"]),d.expose(d.ListProtocol.pop,["pos=",-1]),d.expose(d.ListProtocol.count,["sub","start=",null,"end=",null]),d.expose(d.ListProtocol.find,["sub","start=",null,"end=",null]),d.expose(d.ListProtocol.rfind,["sub","start=",null,"end=",null]);var s=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u.ul4type=function(){return"str"},u.count=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._count(t,u,e,n)},u.find=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._find(t,u,e,n)},u.rfind=function(t,u,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),d._rfind(t,u,e,n)},u.replace=function(t,u,e,n){void 0===n&&(n=null),null===n&&(n=t.length);for(var r=[];t.length;){var i=t.indexOf(u);if(-1===i||!n--){r.push(t);break}r.push(t.substr(0,i)),r.push(e),t=t.substr(i+u.length)}return r.join("")},u.strip=function(t,u){if(void 0===u&&(u=null),"string"!=typeof(u=u||" \r\n\t"))throw new d.TypeError("strip() requires a string argument");for(;t&&0<=u.indexOf(t[0]);)t=t.substr(1);for(;t&&0<=u.indexOf(t[t.length-1]);)t=t.substr(0,t.length-1);return t},u.lstrip=function(t,u){if(void 0===u&&(u=null),"string"!=typeof(u=u||" \r\n\t"))throw new d.TypeError("lstrip() requires a string argument");for(;t&&0<=u.indexOf(t[0]);)t=t.substr(1);return t},u.rstrip=function(t,u){if(void 0===u&&(u=null),"string"!=typeof(u=u||" \r\n\t"))throw new d.TypeError("rstrip() requires a string argument");for(;t&&0<=u.indexOf(t[t.length-1]);)t=t.substr(0,t.length-1);return t},u.split=function(t,u,e){if(void 0===u&&(u=null),void 0===e&&(e=null),null!==u&&"string"!=typeof u)throw new d.TypeError("split() requires a string");if(null===e){var n=t.split(null!==u?u:/[ \n\r\t]+/);return null===u&&(n.length&&!n[0].length&&n.splice(0,1),n.length&&!n[n.length-1].length&&n.splice(-1)),n}if(null!==u){for(n=[];t.length;){var r=t.indexOf(u);if(-1===r||!e--){n.push(t);break}n.push(t.substr(0,r)),t=t.substr(r+u.length)}return n}for(n=[];t.length;){t=d.StrProtocol.lstrip(t,null);var i=void 0;(i=e--?t.split(/[ \n\r\t]+/,1)[0]:t).length&&n.push(i),t=t.substr(i.length)}return n},u.rsplit=function(t,u,e){if(void 0===u&&(u=null),void 0===e&&(e=null),null!==u&&"string"!=typeof u)throw new d.TypeError("rsplit() requires a string as second argument");if(null===e){var n=t.split(null!==u?u:/[ \n\r\t]+/);return null===u&&(n.length&&!n[0].length&&n.splice(0,1),n.length&&!n[n.length-1].length&&n.splice(-1)),n}if(null!==u){for(n=[];t.length;){var r=t.lastIndexOf(u);if(-1===r||!e--){n.unshift(t);break}n.unshift(t.substr(r+u.length)),t=t.substr(0,r)}return n}for(n=[];t.length;){t=d.StrProtocol.rstrip(t);var i=void 0;(i=e--?(i=t.split(/[ \n\r\t]+/))[i.length-1]:t).length&&n.unshift(i),t=t.substr(0,t.length-i.length)}return n},u.splitlines=function(t,u){void 0===u&&(u=!1);for(var e,n=[],r=t.length,i=0,o=0;;){if(r<=i)return o!=i&&n.push(t.substring(o)),n;var f=(void 0,"\n"===(e=t[0])||"\v"==e||"\f"==e||""==e||""==e||""==e||""==e||"\u2028"==e||"\u2029"==e?1:"\r"===e?0==r-1?1:"\n"===t[1]?2:1:0);if(f){var s=i+(u?f:0);n.push(t.substring(o,s)),o=i+=f}else++i}},u.lower=function(t){return t.toLowerCase()},u.upper=function(t){return t.toUpperCase()},u.capitalize=function(t){return t.length&&(t=t[0].toUpperCase()+t.slice(1).toLowerCase()),t},u.join=function(t,u){for(var e=[],n=d._iter(u);;){var r=n.next();if(r.done)break;e.push(r.value)}return e.join(t)},u.startswith=function(t,u){if("string"==typeof u)return t.substr(0,u.length)===u;if(d._islist(u)){for(var e=0,n=u;e<n.length;e++){var r=n[e];if(t.substr(0,r.length)===r)return!0}return!1}throw new d.TypeError("startswith() argument must be string")},u.endswith=function(t,u){if("string"==typeof u)return t.substr(t.length-u.length)===u;if(d._islist(u)){for(var e=0,n=u;e<n.length;e++){var r=n[e];if(t.substr(t.length-r.length)===r)return!0}return!1}throw new d.TypeError("endswith() argument must be string or list of strings")},u.attrs=g._makeset("split","rsplit","splitlines","strip","lstrip","rstrip","upper","lower","capitalize","startswith","endswith","replace","count","find","rfind","join"),u}(i);d.StrProtocol=s,d.expose(d.StrProtocol.count,["sub","start=",null,"end=",null]),d.expose(d.StrProtocol.find,["sub","start=",null,"end=",null]),d.expose(d.StrProtocol.rfind,["sub","start=",null,"end=",null]),d.expose(d.StrProtocol.replace,["old","new","count=",null]),d.expose(d.StrProtocol.strip,["chars=",null]),d.expose(d.StrProtocol.lstrip,["chars=",null]),d.expose(d.StrProtocol.rstrip,["chars=",null]),d.expose(d.StrProtocol.split,["sep=",null,"count=",null]),d.expose(d.StrProtocol.rsplit,["sep=",null,"count=",null]),d.expose(d.StrProtocol.splitlines,["keepends=",!1]),d.expose(d.StrProtocol.lower,[]),d.expose(d.StrProtocol.upper,[]),d.expose(d.StrProtocol.capitalize,[]),d.expose(d.StrProtocol.join,["iterable"]),d.expose(d.StrProtocol.startswith,["prefix"]),d.expose(d.StrProtocol.endswith,["suffix"]);var a=function(){function t(){this.__type__="set"}return t.prototype.add=function(){for(var t=[],u=0;u<arguments.length;u++)t[u]=arguments[u];for(var e=0,n=t;e<n.length;e++){var r=n[e];this.items[r]=!0}},t.prototype.has=function(t){return!!this.items[t]},t.prototype.__getattr__=function(t){var u=this;switch(t){case"add":return d.expose(["*items"],function(t){u.add.apply(u,t)});default:throw new d.AttributeError(this,t)}},t.prototype.__contains__=function(t){return this.items[t]||!1},t.prototype.__bool__=function(){for(var t in this.items)if(this.items.hasOwnProperty(t))return!0;return!1},t.prototype.__repr__=function(){var t=[];t.push("{");var u=0;for(var e in this.items)this.items.hasOwnProperty(e)&&(u++&&t.push(", "),t.push(d._repr(e)));return u||t.push("/"),t.push("}"),t.join("")},t.prototype.__eq__=function(t){if(d._isset(t)){var u=0;for(var e in this.items){if(!t.has(e))return!1;++u}return t.size==u}if(d._isul4set(t)){u=0;for(var e in this.items){if(!t[e])return!1;++u}for(var e in t.items)--u;return 0==u}return!1},t.prototype.__le__=function(t){if(d._isset(t)){for(var u in this.items)if(!t.has(u))return!1;return!0}if(d._isul4set(t)){for(var u in this.items)if(!t.items[u])return!1;return!0}d._unorderable("<",this,t)},t.prototype.__ge__=function(u){if(d._isset(u)){var e=!0;return u.forEach(function(t){u.items[t]||(e=!1)}),e}if(d._isul4set(u)){for(var t in u.items)if(!this.items[t])return!1;return!0}d._unorderable("<=",this,u)},t}();d._Set=a;var l=function(t,u){this.start=t,this.stop=u};d.slice=l;var c=function(e){function t(t){var u=e.call(this,t)||this;return u.name="UL4 Exception",u}return v(t,e),t.prototype.__getattr__=function(t){switch(t){case"cause":return this.cause;default:throw new d.AttributeError(this,t)}},t}(Error),_=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u}(d.Exception=c);d.ArgumentError=_;var p=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u}(c);d.TypeError=p;var h=function(n){function t(t,u){var e=n.call(this,"object of type "+d._type(t)+" has no attribute "+d._repr(u))||this;return e.obj=t,e.attrname=u,e}return v(t,n),t}(c);d.AttributeError=h;var b=function(t){function u(){return null!==t&&t.apply(this,arguments)||this}return v(u,t),u}(d.Exception);d.ValueError=b}(p.ul4||(p.ul4={})),function(t){t.register=function(t,u){u.prototype.ul4onname=t},t.dumps=function(t,u){var e=new n(u);return e.dump(t),e.finish()},t.loads=function(t,u){return void 0===u&&(u=null),new e(t,u).load()};var n=function(){function t(t){void 0===t&&(t=null),this.data=[],this._level=0,this._strings2index={},this._ids2index={},this._backrefs=0}return t.prototype._line=function(t){for(var u=[],e=1;e<arguments.length;e++)u[e-1]=arguments[e];if(null!==this.indent)for(var n=0;n<this._level;++n)this.data.push(this.indent);else this.data.length&&this.data.push(" ");if(this.data.push(t),u.length){var r=this.indent;this.indent=null;for(var i=0,o=u;i<o.length;i++){var f=o[i];this.dump(f)}this.indent=r}null!==this.indent&&this.data.push("\n")},t.prototype.finish=function(){return this.data.join("")},t.prototype.dump=function(t){if(null===t)this._line("n");else if("boolean"==typeof t)this._line(t?"bT":"bF");else if("number"==typeof t){var u=Math.round(t)==t?"i":"f";this._line(u+t)}else if("string"==typeof t){if(void 0!==(n=this._strings2index[t]))this._line("^"+n);else{this._strings2index[t]=this._backrefs++;var e=p.ul4._str_repr(t).replace("<","\\x3c");this._line("S"+e)}}else if(p.ul4._iscolor(t))this._line("c",t.r(),t.g(),t.b(),t.a());else if(p.ul4._isdate(t))this._line("x",t.year(),t.month(),t.day());else if(p.ul4._isdatetime(t))this._line("z",t.getFullYear(),t.getMonth()+1,t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),1e3*t.getMilliseconds());else if(p.ul4._istimedelta(t))this._line("t",t.days(),t.seconds(),t.microseconds());else if(p.ul4._ismonthdelta(t))this._line("m",t.months());else if(t instanceof p.ul4.slice)this._line("r",t.start,t.stop);else if(t.ul4onname&&t.ul4ondump){if(t.__id__){var n;if(void 0!==(n=this._ids2index[t.__id__]))return void this._line("^"+n);this._ids2index[t.__id__]=this._backrefs++}this._line("O",t.ul4onname),++this._level,t.ul4ondump(this),--this._level,this._line(")")}else if(p.ul4._islist(t)){this._line("l"),++this._level;for(var r=0,i=t;r<i.length;r++){var o=i[r];this.dump(o)}--this._level,this._line("]")}else if(p.ul4._ismap(t)){this._line("e"),++this._level;for(var f=0,s=t.entries();f<s.length;f++){var a=s[f],l=a[0],c=a[1];this.dump(l),this.dump(c)}--this._level,this._line("}")}else if(p.ul4._isdict(t)){for(var l in this._line("d"),++this._level,t)this.dump(l),this.dump(t[l]);--this._level,this._line("}")}else{if(!p.ul4._isset(t))throw new p.ul4.ValueError("can't create UL4ON dump of object "+p.ul4._repr(t));this._line("y"),++this._level;for(var _=0,d=t.values();_<d.length;_++){o=d[_];this.dump(o)}--this._level,this._line("}")}},t}();t.Encoder=n;var e=function(){function t(t,u){void 0===u&&(u=null),this.data=t||null,this.registry=u,this.pos=0,this.backrefs=[],this.stack=[]}return t.prototype.load=function(){},t}();t.Decoder=e}(p.ul4on||(p.ul4on={})),Object.defineProperty(p,"__esModule",{value:!0})});
//# sourceMappingURL=ul4.js.map
