const _js_Date = Date;
type _js_date = Date;

namespace helpers {
	/**
	 * checks if map exists when loading
	 */
	const _havemap: boolean = (typeof(Map) === "function" && typeof(Map.prototype.forEach) === "function");
	
	/**
	 * checks if maps constructor exists when loading
	 */
    const _havemapconstructor: boolean = (function () {
        if (_havemap)
	    {
		    try
		    {
		    	if (new Map([[1, 2]]).size == 1)
		    		return true;
		    }
		    catch (error)
		    {
		    }
        }
        return false;
	})()
	
	/**
	 * checks if set exists when loading
	 */
    const _haveset: boolean = (typeof(Set) === "function" && typeof(Set.prototype.forEach) === "function");
	
	/**
	 * checks if set constructor exists when loading
	 */
	const _havesetconstructor: boolean = (function () {
        if (_haveset)
	    {
		    try
	    	{
	    		if (new Set([1, 2]).size == 2)
	    			return true;
	    	}
		    catch (error)
		    {
		    }
        }
        return false;
	})()
	
	/**
	 * make a Maplike
	 * @param {any[]} items 
	 */
	const _makemap: (...items: any[]) => Map<any,any> | any = (function () {
		if( _havemap ) {
			return function( ...items: any[] ) {
				let map: Map<any,any> = new Map();

				for (let [key, value] of items)
					map.set(key, value);
				return map;	
			}
		}
		else {
			return function( ...items: any[] ) {
				let map: any = {};

				for (let [key, value] of items)
					map[key] = value;
				return map;
			}
		}
	})()
	
	/**
	 * set a value in a Maplike
	 */
	export const _setmap: (map: Map<string, any> | any, key: string, value: any) => void = (function () {
		if( _havemap ) {
			return function (map: Map<string, any>, key: string, value: any) {
				map.set(key, value);
			}
		}
		else {
			return function( map: object, key: string, value: any) {
				(<any>map)[key] = value;
			}
		}
	})();
	/**
	 * create empty Maplike
	 */
	export const _emptymap: () => Map<string, any> | any = (function() {
		if( _havemap ) {
			return function() {
				return new Map();
			}
		} 
		else {
			return function() {
				return <any>{};
			}
		}
	})()
	/**
	 * get value for a key from a Maplike
	 */
	const _getmap: ( map: Map<string, any> |  any, key: string ) => any = (function() {
		if( _havemap ) {
			return function( map: Map<string, any>, key: string) {
				return map.get( key );
			}
		}
		else {
			return function( map: any, key: string ) {
				return map[key];
			}
		}
	})()
	/**
	 * create empty Set
	 */
	export const _emptyset: () => Set<any> | ul4._Set = (function() {
		if( _haveset ) {
			return function () {
				return new Set();
			}
		}
		else {
			return function () {
				return new ul4._Set();
			}
		}
	})()
	/**
	 * make a set
	 * @param {string[]} items
	 */
	export function _makeset(...items: string[]) {
		let set: Set<string> | ul4._Set = _emptymap();
		for( let item of items ) {
			set.add( item );
		}
		return set;
	}
}
export namespace ul4 {

	// This is outside of ``Proto`` on purpose
	// This way reactive frameworks like ``Vue.js`` don't get to see it
	// and complain about mutating render functions when those create new objects.
	let _nextid: number = 1;

	// --FUNCTIONS--

	/**
	 * Return a ``Color`` object from the hue, luminescence, saturation and alpha values ``h``, ``l``, ``s`` and ``a`` (i.e. using the HLS color model)
	 */
	export function _hls( h: number, l: number, s: number, a: number ) {
		let _v = function(m1: any, m2: any, hue:any)
		{
			hue = hue % 1.0;
			if (hue < 1/6)
				return m1 + (m2-m1)*hue*6.0;
			else if (hue < 0.5)
				return m2;
			else if (hue < 2/3)
				return m1 + (m2-m1)*(2/3-hue)*6.0;
			return m1;
		};

		let m1, m2;
		if (typeof(a) === "undefined")
			a = 1;
		if (s === 0.0)
			return ul4._rgb(l, l, l, a);
		if (l <= 0.5)
			m2 = l * (1.0+s);
		else
			m2 = l+s-(l*s);
		m1 = 2.0*l - m2;
		return ul4._rgb(_v(m1, m2, h+1/3), _v(m1, m2, h), _v(m1, m2, h-1/3), a);
	}

	/**
	 * Create a color object from the red, green, blue and alpha values ``r``, ``g``, ``b`` and ``a``
	 * @param r 
	 * @param g 
	 * @param b 
	 * @param a 
	 */
	export function _rgb( r: number, g: number, b:number, a: number ) {
		return new ul4.Color(255*r, 255*g, 255*b, 255*a);
	}

	/**
	 * Return a ``Date`` object from the arguments passed in 
	 * @param year 
	 * @param month 
	 * @param day 
	 */
	export function _date( year: number, month: number, day: number )  {
		return new ul4.Date(year, month, day);
	}

	export function _isleap( obj: any ) {
		return new _js_Date(obj.getFullYear(), 1, 29).getMonth() === 1;
	}

	export function _formatsource( out: string[] ) {
		let finalout = [];
		let level = 0, needlf = false;
		for (let part of out)
		{
			if (typeof(part) === "number")
			{
				level += part;
				needlf = true;
			}
			else
			{
				if (needlf)
				{
					finalout.push("\n");
					for (let j = 0; j < level; ++j)
						finalout.push("\t");
					needlf = false;
				}
				finalout.push(part);
			}
		}
		if (needlf)
			finalout.push("\n");
		return finalout.join("");
	}

	/**
	 * (this is non-trivial, because it follows the Python semantic of ``-5 % 2`` being ``1``)
	 * @param obj1 
	 * @param obj2 
	 */
	export function _mod( obj1: number, obj2: number ) {
		let div = Math.floor(obj1 / obj2);
		let mod = obj1 - div * obj2;

		if (mod !== 0 && ((obj2 < 0 && mod > 0) || (obj2 > 0 && mod < 0)))
		{
			mod += obj2;
			--div;
		}
		return obj1 - div * obj2;
	}

	export function _unorderable( operator: string, obj1: any, obj2: any ) {
		throw new ul4.TypeError("unorderable types: " + ul4._type(obj1) + " " + operator + " " + ul4._type(obj2));
	}

	export function expose( f: any, signature: any, options?: any ) {
		options = options || {};
		if (options.name)
			f._ul4_name = options.name;
		if (ul4._islist(signature))
			signature = new ul4.Signature(...signature);
		f._ul4_signature = signature;
		f._ul4_needsobject = options.needsobject || false;
		f._ul4_needscontext = options.needscontext || false;
	}

	export function _find( obj: any, sub: any,  start: number | null = null, end: number | null = null ) {
		if (start === null)
			start = 0;
		if (end === null)
			end = <number>obj.length || 0;
		
		if (start < 0)
			start += obj.length;
		if (end < 0)
			end += obj.length;
		start = ul4._bound(start, obj.length);
		end = ul4._bound(end, obj.length);

		if (start !== 0 || end !== obj.length)
		{
			if (typeof(obj) == "string")
				obj = obj.substring(start, end);
			else
				obj = obj.slice(start, end);
		}
		let result = obj.indexOf(sub);
		if (result !== -1)
			result += start;
		return result;
	}

	export function _eq( obj1: any, obj2: any ): boolean {
		let numbertypes: string[] = [ "boolean", "number" ];
		if( obj1 && typeof( obj1.__eq__ ) === "function" )
			return obj1.__eq__(obj2);
		else if (obj2 && typeof(obj2.__eq__) === "function")
			return obj2.__eq__(obj1);
		else if (obj1 === null)
			return obj2 === null;
		else if (numbertypes.indexOf(typeof(obj1)) != -1) {
			if (numbertypes.indexOf(typeof(obj2)) != -1)
				return obj1 == obj2;
			else
				return false;
		}
		else if (typeof(obj1) === "string") {
			if (typeof(obj2) === "string")
				return obj1 == obj2;
			else
				return false;
		}
		else if (ul4._isdatetime(obj1))
		{
			if (ul4._isdatetime(obj2))
				return obj1.getTime() == obj2.getTime();
			else
				return false;
		}
		else if (ul4._islist(obj1))
		{
			if (ul4._islist(obj2))
			{
				// Shortcut, if it's the same object
				if (obj1 === obj2)
					return true;
				if (obj1.length != obj2.length)
					return false;
				for (let i = 0; i < obj1.length; ++i)
				{
					if (!ul4._eq(obj1[i], obj2[i])) // This might lead to infinite recursion and a stackoverflow, but it does in all implementations
						return false;
				}
				return true;
			}
			else
				return false;
		}
		else if (ul4._isobject(obj1))
		{
			if (ul4._isobject(obj2))
			{
				// Shortcut, if it's the same object
				if (obj1 === obj2)
					return true;
				// Test that each attribute of ``obj1`` can also be found in ``obj2`` and has the same value
				for (let key in obj1)
				{
					if (obj2.hasOwnProperty(key))
					{
						if (!ul4._eq(obj1[key], obj2[key]))
							return false;
					}
					else
						return false;
				}
				// Test that each attribute of ``obj2`` is alos in ``obj1`` (the value has been tested before)
				for (let key in obj2)
				{
					if (!obj1.hasOwnProperty(key))
						return false;
				}
				return true;
			}
			else if (ul4._ismap(obj2))
			{
				// Test that each attribute of ``obj1`` can also be found in ``obj2`` and has the same value
				for (let key in obj1)
				{
					if (obj2.has(key))
					{
						if (!ul4._eq(obj1[key], obj2.get(key)))
							return false;
					}
					else
						return false;
				}
				// Test that each attribute of ``obj2`` is alos in ``obj1`` (the value has been tested before)
				let result = true;
				obj2.forEach(function(value: any, key: any){
					if (!obj1.hasOwnProperty(key))
						result = false;
				});
				return result;
			}
			else
				return false;
		}
		else if (ul4._ismap(obj1))
		{
			if (ul4._isobject(obj2))
			{
				// Test that each attribute of ``obj1`` can also be found in ``obj2`` and has the same value
				let result = true;
				obj1.forEach(function(value: any, key: any){
					if (result) // Skip code, if result is already ``false``
					{
						if (!obj2.hasOwnProperty(key))
							result = false;
						else if (!ul4._eq(obj1.get(key), obj2[key]))
							result = false;
					}
				});
				if (!result)
					return false;
				// Test that each attribute of ``obj2`` is alos in ``obj1`` (the value has been tested before)
				for (let key in obj2)
				{
					if (!obj1.has(key))
						return false;
				}
				return true;
			}
			else if (ul4._ismap(obj2))
			{
				// Shortcut, if it's the same object
				if (obj1 === obj2)
					return true;
				if (obj1.size != obj2.size)
					return false;
				// Test that each attribute of ``obj1`` can also be found in ``obj2`` and has the same value
				let result = true;
				obj1.forEach(function(value: any, key: any){
					if (result) // Skip code, if result is already ``false``
					{
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
		else if (ul4._isset(obj1))
		{
			// We don't have to test for ``ul4._Set`` as ``ul4._Set`` implements ``__eq__``
			if (ul4._isset(obj2))
			{
				// Shortcut, if it's the same object
				if (obj1 === obj2)
					return true;
				if (obj1.size != obj2.size)
					return false;
				let result = true;
				obj1.forEach(function(value: any){
					if (result) // Skip code, if result is already ``false``
					{
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

	/**
	 * Clip a number to the range [0;max)
	 * @param value 
	 * @param upper 
	 */
	export function _bound( value: number, upper: number ): number {
		if (value < 0)
			return 0;
		else if (value > upper)
			return upper;
		else
			return value;

	}

	export function _count(obj: any, sub: any, start: number | null =null, end: number | null =null)
	{
		if (start === null)
			start = 0;
		if (start < 0)
			start += obj.length;

		if (end === null)
			end = obj.length || 0;
		if (<number>end < 0)
			end += obj.length;
		// cast end to number
		let isstr = ul4._isstr(obj);

		if (isstr && !sub.length)
		{
			if (<number>end < 0 || start > obj.length || start > <number>end)
				return 0;
			let result = <number>end - start + 1;
			if (result > obj.length + 1)
				result = obj.length + 1;
			return result;
		}

		start = ul4._bound(start, obj.length);
		end = ul4._bound(<number>end, obj.length);

		let count = 0;
		if (ul4._islist(obj))
		{
			for (let i = start; (<number>i) < (<number>end); ++(<number>i))
			{
				if (ul4._eq(obj[(<number>i)], sub))
					++count;
			}
			return count;
		}
		else // string
		{
			let lastIndex = start;

			for (;;)
			{
				lastIndex = obj.indexOf(sub, lastIndex);
				if (lastIndex == -1)
					break;
				if (lastIndex + sub.length > <number>end)
					break;
				++count;
				lastIndex += sub.length;
			}
			return count;
		}
	};

	export function _isul4set( obj: any ): boolean {
		return (obj instanceof ul4._Set);
	}
	/**
	 * check if type is string
	 * @param obj 
	 */
	export function _isstr( obj: any ): boolean {
		return typeof( obj ) === "string";
	}

	/**
	 * Check if ``obj`` is a color
	 * @param obj 
	 */
	export function _iscolor( obj: any ): boolean {
		return (obj instanceof ul4.Color);
	}

	export function _isdate( obj: any ): boolean {
		return (obj instanceof ul4.Date);
	}

	export function _isdatetime( obj: any ): boolean {
		return Object.prototype.toString.call(obj) == "[object Date]";
	}

	//TODO
	export function _istimedelta( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _ismonthdelta( obj: any ): boolean {
		return false;
	}

	export function _islist( obj: any ): boolean {
		return Object.prototype.toString.call(obj) == "[object Array]";
	}

	export function _ismap( obj: any ): boolean {
		return obj !== null && typeof(obj) === "object" && typeof(obj.__proto__) === "object" && obj.__proto__ === Map.prototype;
	}

	export function _isdict( obj: any ): boolean {
		return ul4._isobject(obj) || ul4._ismap(obj);
	}

	export function _isset( obj: any ): boolean {
		return Object.prototype.toString.call(obj) == "[object Set]";
	}

	export function _isobject( obj: any ): boolean {
		return Object.prototype.toString.call(obj) == "[object Object]" && typeof(obj.__type__) === "undefined" && !(obj instanceof ul4.Proto);
	}

	export function _isiter( obj: any ): boolean {
		return obj !== null && typeof(obj) === "object" && typeof(obj.next) === "function";
	}

	/**
	 * Return a string representation of ``obj``: If possible this should be an object literal supported by UL4, otherwise the output should be bracketed with ``<`` and ``>``
	 * @param obj 
	 */
	export function _repr( obj: any ): string {
		return ul4._repr_internal( obj, false );
	}

	export function _repr_internal( obj: any, ascii:boolean ) {
		if (obj === null)
			return "None";
		else if (obj === false)
			return "False";
		else if (obj === true)
			return "True";
		else if (typeof(obj) === "string")
			return ul4._str_repr(obj, ascii);
		else if (typeof(obj) === "number")
			return "" + obj;
		else if (typeof(obj) === "function")
			if (obj._ul4_name || obj.name)
				return "<function " + (obj._ul4_name || obj.name) + ">";
			else
				return "<anonymous function>";
		else if (ul4._isdate(obj))
			return ul4._date_repr(obj, ascii);
		else if (ul4._isdatetime(obj))
			return ul4._datetime_repr(obj, ascii);
		else if (typeof(obj) === "undefined")
			return "<undefined>";
		else if (typeof(obj) === "object" && typeof(obj.__repr__) === "function")
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

	export function _object_repr( obj: any, ascii: boolean = false ): string {
		let v = [];
		v.push("{");
		let i = 0;
		for (let key in obj)
		{
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

	export function _set_repr( obj: any, ascii: boolean = false ): string {
		let v: any[] = [];
		v.push("{");
		if (!obj.size)
			v.push("/");
		else
		{
			let i = 0;
			obj.forEach(function(value: any, key: any){
				if (i++)
					v.push(", ");
				v.push(ul4._repr_internal(value, ascii));
			});
		}
		v.push("}");
		return v.join("");
	}

	export function _map_repr( obj: any, ascii: boolean = false ): string {
		let v: any[] = [];
		v.push("{");

		let i = 0;
		obj.forEach(function(value: any, key: any){
			if (i++)
				v.push(", ");
			v.push(ul4._repr_internal(key, ascii));
			v.push(": ");
			v.push(ul4._repr_internal(value, ascii));
		});

		v.push("}");
		return v.join("");

	}

	export function _list_repr( obj: any, ascii: boolean = false ): string {
		let v: any[] = [];
		v.push("[");
		for (let i = 0; i < obj.length; ++i)
		{
			if (i !== 0)
				v.push(", ");
			v.push(ul4._repr_internal(obj[i], ascii));
		}
		v.push("]");
		return v.join("");

	}

	export function _datetime_repr( obj: any, ascii: boolean = false ): string {
		let year = obj.getFullYear();
		let month = obj.getMonth()+1;
		let day = obj.getDate();
		let hour = obj.getHours();
		let minute = obj.getMinutes();
		let second = obj.getSeconds();
		let ms = obj.getMilliseconds();
		let result = "@(" + year + "-" + ul4._lpad(month.toString(), "0", 2) + "-" + ul4._lpad(day.toString(), "0", 2) + "T";

		if (hour || minute || second || ms)
		{
			result += ul4._lpad(hour.toString(), "0", 2) + ":" + ul4._lpad(minute.toString(), "0", 2);
			if (second || ms)
			{
				result += ":" + ul4._lpad(second.toString(), "0", 2)
				if (ms)
					result += "." + ul4._lpad(ms.toString(), "0", 3) + "000";
			}
		}
		result += ")";

		return result;

	}

	export function _date_repr( obj: any, ascii: boolean = false ): string {
		let date = <_js_date>obj._date;
		let year: number = date.getFullYear();
		let month: number = date.getMonth()+1;
		let day: number = date.getDate();
		let result = "@(" + year + "-" + ul4._lpad(month.toString(), "0", 2) + "-" + ul4._lpad(day.toString(), "0", 2) + ")";
		return result;

	}

	export function _str_repr( str: string, ascii: boolean = false ): string {
		let result: string = "";
		let squote: boolean = false, dquote: boolean = false;

		for (let c of str)
		{
			if (c == '"')
			{
				dquote = true;
				if (squote)
					break;
			}
			else if (c == "'")
			{
				squote = true;
				if (dquote)
					break;
			}
		}

		// Prefer single quotes: Only use double quotes if the string contains single quotes, but no double quotes
		let quote = (squote && !dquote) ? '"' : "'";

		for (let c of str)
		{
			switch (c)
			{
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
					let code: number = c.charCodeAt(0);
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

	export function _lpad( string: string | number, pad: string, len: number ) {
		if (typeof(string) === "number")
			string = string.toString();
		while (string.length < len)
			string = pad + string;
		return string;
	}

	export function _type( obj: any ): string {
		if (obj === null)
			return "none";
		else if (obj === false || obj === true)
			return "bool";
		else if (typeof(obj) === "undefined")
			return "undefined";
		else if (typeof(obj) === "number")
			return Math.round(obj) == obj ? "int" : "float";
		else if (typeof(obj) === "function")
			return "function";
		else
		{
			if (typeof(obj.ul4type) === "function")
				return obj.ul4type();
			else
				return ul4.Protocol.get(obj).ul4type();
			return "";
		}
	}
	
	export function _rfind( obj: any, sub: any, start: number | null = null, end: number | null = null ) {
		if (start === null)
			start = 0;
		if (end === null)
			end = <number>obj.length;
		if (start < 0)
			start += obj.length;
		if (end < 0)
			end += obj.length;
		start = ul4._bound(start, obj.length);
		end = ul4._bound(end, obj.length);

		if (start !== 0 || end !== obj.length)
		{
			if (typeof(obj) == "string")
				obj = obj.substring(start, end);
			else
				obj = obj.slice(start, end);
		}
		let result = obj.lastIndexOf(sub);
		if (result !== -1)
			result += start;
		return result;
	}

	export function _iter( obj: any ): {index: number; next: Function} {
		if (typeof(obj) === "string" || ul4._islist(obj))
		{
			return {
				index: 0,
				next: function()
				{
					if (this.index < obj.length)
						return {value: obj[this.index++], done: false};
					else
						return {done: true};
				}
			};
		}
		else if (ul4._isiter(obj))
			return obj;
		else if (obj !== null && typeof(obj.__iter__) === "function")
			return obj.__iter__();
		else if (ul4._ismap(obj))
		{
			let keys: string[] = [];
			obj.forEach(function(value: string, key: string){
				keys.push(key);
			});
			return {
				index: 0,
				next: function()
				{
					if (this.index >= keys.length)
						return {done: true};
					return {value: keys[this.index++], done: false};
				}
			};
		}
		else if (ul4._isset(obj))
		{
			let values: string[] = [];
			obj.forEach(function(value: string, key: string){
				values.push(value);
			});
			return {
				index: 0,
				next: function()
				{
					if (this.index >= values.length)
						return {done: true};
					return {value: values[this.index++], done: false};
				}
			};
		}
		else if (ul4._isul4set(obj))
		{
			return ul4._iter(obj.items);
		}
		else if (ul4._isobject(obj))
		{
			let keys: string[] = [];
			for (let key in obj)
				keys.push(key);
			return {
				index: 0,
				next: function()
				{
					if (this.index >= keys.length)
						return {done: true};
					return {value: keys[this.index++], done: false};
				}
			};
		}
		throw new ul4.TypeError(ul4._type(obj) + " object is not iterable");
	}


	// TODO
	export class PROTO {}

	export class Proto {
		public __id__: number;

		constructor() {
			this.__id__ = _nextid++;
		}

		ul4type() {
			return this.constructor.name;
		}

		// equality comparison of objects defaults to identity comparison
		__eq__( other: any ) {
			return this === other;
		}

		// To overwrite equality comparison, you only have to overwrite ``__eq__``,
		// ``__ne__`` will be synthesized from that
		__ne__( other: any )
		{
			return !this.__eq__(other);
		}

		// For other comparison operators, each method has to be implemented:
		// ``<`` calls ``__lt__``, ``<=`` calls ``__le__``, ``>`` calls ``__gt__`` and
		// ``>=`` calls ``__ge__``

		__bool__()
		{
			return true;
		}

	}

	export class TimeDelta extends Proto {

		private _microseconds: number;
		private _seconds: number;
		private _days: number;

		constructor(days=0, seconds=0, microseconds=0)
		{
			super();
			let total_microseconds = Math.floor((days * 86400 + seconds)*1000000 + microseconds);

			microseconds = ul4.ModAST.prototype._do(total_microseconds, 1000000);
			let total_seconds = Math.floor(total_microseconds / 1000000);
			seconds = ul4.ModAST.prototype._do(total_seconds, 86400);
			days = Math.floor(total_seconds / 86400);
			if (seconds < 0)
			{
				seconds += 86400;
				--days;
			}

			this._microseconds = microseconds;
			this._seconds = seconds;
			this._days = days;
		}
	}

	export class Date extends Proto {

		public _date: _js_date;

		constructor( year: number, month: number, day: number ) {
			super();
			this._date = new _js_Date( year, month-1, day );
		}

		ul4type() {
			return "date";
		}

		__repr__() {
			return '@(' + this.__str__() + ")";
		}

		__str__() {
			return ul4._lpad(this._date.getFullYear(), "0", 4) + "-" + ul4._lpad(this._date.getMonth()+1, "0", 2) + "-" + ul4._lpad(this._date.getDate(), "0", 2);
		}

		__eq__( other: any ) {
			if (other instanceof ul4.Date)
				return this._date.getTime() === other._date.getTime();
			return false;
		}

		__lt__( other: any ) {
			if (other instanceof ul4.Date)
				return this._date < other._date;
			ul4._unorderable("<", this, other);
		}

		__le__( other: any ) {
			if (other instanceof ul4.Date)
				return this._date <= other._date;
			ul4._unorderable("<=", this, other);	
		}

		__gt__( other: any ) {
			if (other instanceof ul4.Date)
				return this._date > other._date;
			ul4._unorderable(">", this, other);
		}

		__ge__( other: any ) {
			if (other instanceof ul4.Date)
				return this._date >= other._date;
			ul4._unorderable(">=", this, other);
		}

		year() {
			return this._date.getFullYear();
		}

		month() {
			return this._date.getMonth()+1;
		}

		day() {
			return this._date.getDate();
		}
	}

	export class Signature extends Proto {

		public args: any[];
		public argNames: any;
		public remargs: any;
		public remkwargs: any;

		constructor( ...args: any[] ) {
			super();
			this.args = [];
			this.argNames = {};
			this.remargs = null;
			this.remkwargs = null;

			let nextDefault = false;
			let lastArgname = null;
			for (let argName of args)
			{
				if (nextDefault)
				{
					this.args.push({name: lastArgname, defaultValue: argName});
					this.argNames[lastArgname] = true;
					nextDefault = false;
				}
				else
				{
					if (argName.substr(argName.length-1) === "=")
					{
						lastArgname = argName.substr(0, argName.length-1);
						nextDefault = true;
					}
					else if (argName.substr(0, 2) === "**")
						this.remkwargs = argName.substr(2);
					else if (argName.substr(0, 1) === "*")
						this.remargs = argName.substr(1);
					else
					{
						this.args.push({name: argName});
						this.argNames[argName] = true;
					}
				}
			}
		}

		/**
		 * Create the argument array for calling a function with this signature with the arguments available from ``args``
		 */
		bindArray( name: string, args: any[], kwargs: any[] ) {
			let finalargs = [];
			let decname = name !== null ? name + "() " : "";

			for (let i = 0; i < this.args.length; ++i)
			{
				let arg = this.args[i];
				if (i < args.length)
				{
					if (kwargs.hasOwnProperty(arg.name))
						throw new ul4.ArgumentError(decname + "argument " + ul4._repr(arg.name) + " (position " + i + ") specified multiple times");
					finalargs.push(args[i]);
				}
				else
				{
					if (kwargs.hasOwnProperty(arg.name))
						finalargs.push(kwargs[arg.name]);
					else
					{
						if (arg.hasOwnProperty("defaultValue"))
							finalargs.push(arg.defaultValue);
						else
							throw new ul4.ArgumentError("required " + decname + "argument " + ul4._repr(arg.name) + " (position " + i + ") missing");
					}
				}
			}

			// Do we accept additional positional arguments?
			if (this.remargs === null)
			{
				// No, but we have them -> complain
				if (args.length > this.args.length)
				{
					let prefix = name === null ? "expected" : name + "() expects";
					throw new ul4.ArgumentError(prefix + " at most " + this.args.length + " positional argument" + (this.args.length != 1 ? "s" : "") + ", " + args.length + " given");
				}
			}
			else
			{
				// Put additional positional arguments in the call into the ``*`` argument (if there are none, this pushes an empty list)
				finalargs.push(args.slice(this.args.length));
			}

			// Do we accept arbitrary keyword arguments?
			if (this.remkwargs === null)
			{
				// No => complain about unknown ones
				for (let key in kwargs)
				{
					if (!this.argNames[key])
					{
						if (name === null)
							throw new ul4.ArgumentError("an argument named " + ul4._repr(key) + " isn't supported");
						else
							throw new ul4.ArgumentError(name + "() doesn't support an argument named " + ul4._repr(key));
					}
				}
			}
			else
			{
				// Yes => Put the unknown ones into an object and add that to the arguments array
				let remkwargs = helpers._emptymap();
				for (let key in kwargs)
				{
					if (!this.argNames[key])
						helpers._setmap(remkwargs, key, kwargs[key]);
				}
				finalargs.push(remkwargs);
			}

			return finalargs;
		}
	}

	export abstract class AST extends Proto {
		protected pos: any;
		public _ul4onattrs: string[] = ["pos"];
		constructor( pos: any ) {
			super();
			this.pos = pos;
		}

		__getattr__(attrname: string)
		{
			if (attrname === "type")
				return this.ul4type;
			else if (this._ul4onattrs.indexOf(attrname) >= 0)
				return (<any>this)[attrname];
			throw new ul4.AttributeError(this, attrname);
		}

		__setitem__(attrname: string, value: any) {
			throw new ul4.TypeError("object is immutable");
		}

		__str__() {
			let out: string[] = [];
			this._str(out);
			return ul4._formatsource(out);
		}

		__repr__() {
			let out: string[] = [];
			this._repr(out);
			return ul4._formatsource(out);
		}

		_handle_eval(context: any) {
			try
			{
				// ? return this._eval(context);
				return this._eval(context);
			}
			catch (exc)
			{
				if (!(exc instanceof ul4.InternalException) && !(exc instanceof ul4.LocationError))
					throw new ul4.LocationError(this, exc);
				throw exc;
			}
		}

		_handle_eval_set(context: any, value: any) {
			try
			{
				return this._eval_set(context, value);
			}
			catch (exc)
			{
				if (!(exc instanceof ul4.LocationError))
					throw new ul4.LocationError(this, exc);
				throw exc;
			}
		}

		_eval_set(context: any, value: any) {
			throw new ul4.LValueRequiredError();
		}

		_handle_eval_modify(context: any, operator: any, value: any) {
			try
			{
				return this._eval_modify(context, operator, value);
			}
			catch (exc)
			{
				if (!(exc instanceof ul4.LocationError))
					throw new ul4.LocationError(this, exc);
				throw exc;
			}
		}

		_eval_modify(context: any, operator: any, value: any ) {
			throw new ul4.LValueRequiredError();
		}

		_repr(out: any) {
		}

		_str(out: any) {
		}

		ul4ondump( encoder: ul4on.Encoder )
		{
			for (let attrname of this._ul4onattrs)
				encoder.dump((<any>this)[attrname]);
		}

		ul4onload( decoder: ul4on.Decoder )
		{
			for (let attrname of this._ul4onattrs)
				(<any>this)[attrname] = decoder.load();
		}

		abstract _eval( context: any ): any;
	}

	export abstract  class CodeAST extends AST {
		
		private tag: any;

		constructor( tag: any, pos: any ) {
			super( tag );
			this.tag = tag;
		}

		_str( out: any ) {
			out.push(this.tag.source.substring(this.pos.start, this.pos.stop).replace(/\r?\n/g, ' '));
		}
	}

	export class ConstAST extends CodeAST {

		private value: any;

		constructor(tag: any, pos: any, value: any)
		{
			super(tag, pos);
			this.value = value;
		}

		_repr(out: any)
		{
			out.push("<ConstAST value=");
			out.push(ul4._repr(this.value));
			out.push(">");
		}

		_eval(context: any)
		{
			return this.value;
		}
	}

	export abstract class BinaryAST extends CodeAST{

		public _ul4onattrs = ul4.AST.prototype._ul4onattrs.concat(["tag"]);

		public obj1: any;
		public obj2: any;

		constructor( tag: any, pos: any, obj1: any, obj2: any) {
			super(tag, pos);
			this.obj1 = obj1;
			this.obj2 = obj2;
		}

		_repr( out: any ) {
			out.push("<");
			out.push(this.constructor.name);
			out.push(" obj1=");
			this.obj1._repr(out);
			out.push(" obj2=");
			this.obj2._repr(out);
			out.push(">");
		}

		_eval( context: any ) {
			let obj1 = this.obj1._handle_eval(context);
			let obj2 = this.obj2._handle_eval(context);
			return this._do(obj1, obj2);
		}

		abstract _do( obj1: any, obj2: any ): any;

	}

	export class ModAST extends BinaryAST {
		_do( obj1: any, obj2: any) {
			return ul4._mod(obj1, obj2);
		}
		_ido(obj1: any, obj2: any)
		{
			return this._do(obj1, obj2);
		}
	}

	export class Protocol {
		public static attrs: Set<string> | ul4._Set = helpers._emptyset();
		public static ul4type(): string {
			return Protocol.constructor.name;
		}
		
		public static dir() {
		}

		public static get( obj: any ) {
			if (ul4._isstr( obj ))
				return ul4.StrProtocol;
			else if ( ul4._islist(obj) )
				return ul4.ListProtocol;
			else if ( ul4._isdate(obj) )
				return ul4.DateProtocol;
			// else if ( ul4._isset(obj) )
			// 	return ul4.SetProtocol;
			// else if ( ul4._ismap(obj) )
			// 	return ul4.MapProtocol;
			// else if ( ul4._isdatetime(obj) )
			// 	return ul4.DateTimeProtocol;
			// else if ( ul4._isobject(obj) )
			// 	return ul4.ObjectProtocol;
			// else
				return ul4.Protocol;
		}

		public static getattr( obj: any, attrname: string) {
			if (obj === null || obj === undefined )
				throw new ul4.AttributeError(obj, attrname);
			else if (typeof(obj.__getattr__) === "function")
				return obj.__getattr__(attrname);
			else if ( this.attrs.has( attrname ))
			{
				let attr = (<any>this)[attrname];
				let realattr = new Function(
					"return function " + attr.name + " (...args: any[]) { return attr.apply(Protocol.attrs, [obj, ...args]); }"
				);
				(<any>realattr)._ul4_name = attr._ul4_name || attr.name;
				(<any>realattr)._ul4_signature = attr._ul4_signature;
				(<any>realattr)._ul4_needsobject = attr._ul4_needsobject;
				(<any>realattr)._ul4_needscontext = attr._ul4_needscontext;
				return realattr;
			}
			else
				throw new ul4.AttributeError(obj, attrname);
		}

		public static hasattr( obj: any, attrname: string ): boolean {
			if (obj === null || typeof(obj) === "undefined")
				return false;
			else if (typeof(obj.__getattr__) === "function")
			{
				try
				{
					obj.__getattr__(attrname);
					return true;
				}
				catch (exc)
				{
					if (exc instanceof ul4.AttributeError && exc.obj === obj)
						return false;
					else
						throw exc;
				}
			}
			else
				return (<any>this).has(attrname);
		}
	}

	export class DateTimeProtocol extends Protocol {

		public static ul4type() {
			return "datetime";
		}

		public static weekday( obj: _js_date ) {
			let d = obj.getDay();
			return d ? d-1 : 6;
		}

		public static calendar( obj: _js_date, firstweekday: number = 0, mindaysinfirstweek: number = 4 ) {
			// Normalize parameters
			firstweekday = ul4._mod(firstweekday, 7);
			if (mindaysinfirstweek < 1)
				mindaysinfirstweek = 1;
			else if (mindaysinfirstweek > 7)
				mindaysinfirstweek = 7;

			// ``obj`` might be in the first week of the next year, or last week of
			// the previous year, so we might have to try those too.
			for (let offset = +1; offset >= -1; --offset)
			{
				let year = obj.getFullYear() + offset;
				// ``refdate`` will always be in week 1
				let refDate = new _js_Date(year, 0, mindaysinfirstweek);
				// Go back to the start of ``refdate``s week (i.e. day 1 of week 1)
				let weekDayDiff = ul4._mod(ul4.DateTimeProtocol.weekday(refDate) - firstweekday, 7);
				let weekStartYear = refDate.getFullYear();
				let weekStartMonth = refDate.getMonth();
				let weekStartDay = refDate.getDate() - weekDayDiff;
				let weekStart = new _js_Date(weekStartYear, weekStartMonth, weekStartDay);
				// Is our date ``obj`` at or after day 1 of week 1?
				if (obj.getTime() >= weekStart.getTime())
				{
					let diff = ul4.SubAST.prototype._do(obj, weekStart);
					// Add 1, because the first week is week 1, not week 0
					let week = Math.floor(diff.days()/7) + 1;
					return [year, week, ul4.DateTimeProtocol.weekday(obj)];
				}
			}
		}

		public static week(obj: any, firstweekday: number =0, mindaysinfirstweek: number =4)
		{
			return (<any>ul4.DateTimeProtocol.calendar(obj, firstweekday, mindaysinfirstweek))[1];
		}

		public static day(obj: any) {
			return obj.getDate();
		}

		public static month(obj: any) {
			return obj.getMonth()+1;
		}

		public static year( obj: any ) {
			return obj.getFullYear();
		}

		public static hour(obj: any)
		{
			return obj.getHours();
		}

		public static minute(obj: any)
		{
			return obj.getMinutes();
		}

		public static second(obj: any)
		{
			return obj.getSeconds();
		}

		public static microsecond(obj: any) {
			return obj.getMilliseconds() * 1000;
		}

		public static mimeformat(obj: any) {
			let weekdayname = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			return weekdayname[ul4.DateTimeProtocol.weekday(obj)] + ", " + ul4._lpad(obj.getDate(), "0", 2) + " " + monthname[obj.getMonth()] + " " + obj.getFullYear() + " " + ul4._lpad(obj.getHours(), "0", 2) + ":" + ul4._lpad(obj.getMinutes(), "0", 2) + ":" + ul4._lpad(obj.getSeconds(), "0", 2) + " GMT";
		}

		public static isoformat(obj: any) {
			let year = obj.getFullYear();
			let month = obj.getMonth()+1;
			let day = obj.getDate();
			let hour = obj.getHours();
			let minute = obj.getMinutes();
			let second = obj.getSeconds();
			let ms = obj.getMilliseconds();
			let result = year + "-" + ul4._lpad(month.toString(), "0", 2) + "-" + ul4._lpad(day.toString(), "0", 2) + "T" + ul4._lpad(hour.toString(), "0", 2) + ":" + ul4._lpad(minute.toString(), "0", 2) + ":" + ul4._lpad(second.toString(), "0", 2);
			if (ms)
				result += "." + ul4._lpad(ms.toString(), "0", 3) + "000";
			return result;
		}

		public static yearday(obj: any) {
			let leap = ul4._isleap(obj) ? 1 : 0;
			let day = obj.getDate();
			switch (obj.getMonth())
			{
				case 0:
					return day;
				case 1:
					return 31 + day;
				case 2:
					return 31 + 28 + leap + day;
				case 3:
					return 31 + 28 + leap + 31 + day;
				case 4:
					return 31 + 28 + leap + 31 + 30 + day;
				case 5:
					return 31 + 28 + leap + 31 + 30 + 31 + day;
				case 6:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + day;
				case 7:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + 31 + day;
				case 8:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + 31 + 31 + day;
				case 9:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + 31 + 31 + 30 + day;
				case 10:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + day;
				case 11:
					return 31 + 28 + leap + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + day;
			}
		}
	}

	export class SubAST extends BinaryAST {

		_do(obj1: any, obj2: any) {
			if (obj1 && typeof(obj1.__sub__) === "function")
				return obj1.__sub__(obj2);
			else if (obj2 && typeof(obj2.__rsub__) === "function")
				return obj2.__rsub__(obj1);
			else if (ul4._isdate(obj1) && ul4._isdate(obj2))
				return this._date_sub(obj1, obj2);
			else if (ul4._isdatetime(obj1) && ul4._isdatetime(obj2))
				return this._datetime_sub(obj1, obj2);
			if (obj1 === null || obj2 === null)
				throw new ul4.TypeError(ul4._type(this.obj1) + " - " + ul4._type(this.obj2) + " is not supported");
			return obj1 - obj2;
		}

		_date_sub(obj1: any, obj2: any) {
			return this._datetime_sub(obj1._date, obj2._date);
		}

		

		_datetime_sub( obj1: any, obj2: any ) {
			let swap = (obj2 > obj1);

			if (swap)
			{
				let t = obj1;
				obj1 = obj2;
				obj2 = t;
			}
			// From now on obj1 is > than obj2

			let year1 = obj1.getFullYear();
			let yearday1 = ul4.DateTimeProtocol.yearday(obj1);
			let year2 = obj2.getFullYear();
			let yearday2 = ul4.DateTimeProtocol.yearday(obj2);

			let diffdays = 0;

			while (year1 > year2)
			{
				diffdays += ul4.DateProtocol.yearday(ul4._date(year2, 12, 31));
				++year2;
			}
			diffdays += yearday1 - yearday2;

			let hours1 = obj1.getHours();
			let minutes1 = obj1.getMinutes();
			let seconds1 = obj1.getSeconds();
			let hours2 = obj2.getHours();
			let minutes2 = obj2.getMinutes();
			let seconds2 = obj2.getSeconds();

			let diffseconds = (seconds1 - seconds2) + 60 * ((minutes1 - minutes2) + 60 * (hours1 - hours2));

			let diffmilliseconds = obj1.getMilliseconds() - obj2.getMilliseconds();

			if (swap)
			{
				diffdays = -diffdays;
				diffseconds = -diffseconds;
				diffmilliseconds = -diffmilliseconds;
			}
			return new ul4.TimeDelta(diffdays, diffseconds, 1000*diffmilliseconds);
		}

	}

	export class DateProtocol extends Protocol {
		
		public static ul4type() {
			return "date";
		}

		public static weekday( obj: Date ): number {
			return ul4.DateTimeProtocol.weekday(obj._date);
		}

		public static calendar(obj: any, firstweekday: number =0, mindaysinfirstweek: number =4)
		{
			return ul4.DateTimeProtocol.calendar(obj._date, firstweekday, mindaysinfirstweek);
		}

		public static week(obj: any, firstweekday: number =0, mindaysinfirstweek: number =4)
		{
			return (<any>ul4.DateProtocol.calendar(obj, firstweekday, mindaysinfirstweek))[1];
		}

		public static day(obj: any)
		{
			return obj._date.getDate();
		}

		public static month(obj: any)
		{
			return obj._date.getMonth()+1;
		}

		public static  year(obj: any)
		{
			return obj._date.getFullYear();
		}

		public static mimeformat(obj: any)
		{
			let weekdayname = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			let d = obj._date;

			return weekdayname[ul4.DateTimeProtocol.weekday(d)] + ", " + ul4._lpad(d.getDate(), "0", 2) + " " + monthname[d.getMonth()] + " " + d.getFullYear();
		}

		public static isoformat(obj: any)
		{
			let d = obj._date;
			return d.getFullYear() + "-" + ul4._lpad((d.getMonth()+1).toString(), "0", 2) + "-" + ul4._lpad(d.getDate().toString(), "0", 2);
		}

		public static yearday(obj: any)
		{
			return ul4.DateTimeProtocol.yearday(obj._date);
		}
	}

	export class ListProtocol extends Protocol {

		public static attrs = helpers._makeset(
			"append",
			"insert",
			"pop",
			"count",
			"find",
			"rfind"
		)

		public static ul4type() {
			return "list";
		}

		public static append( obj: any[], items: any[] ): null {
			for (let item of items)
				obj.push(item);
			return null;
		}

		public static insert( obj: any[], pos: number, items: any[] ): null {
			if (pos < 0)
				pos += obj.length;

			for (let item of items)
				obj.splice(pos++, 0, item);
			return null;
		}

		public static pop( obj: any[], pos: number ): any {
			if (pos < 0)
				pos += obj.length;

			let result = obj[pos];
			obj.splice(pos, 1);
			return result;
		}

		public static count( obj: any[], sub: any[], start: number | null = null, end: number | null = null ) {
			return ul4._count( obj, sub, start, end );
		}

		public static find( obj: any[], sub: any[], start: number | null = null, end: number | null = null ) {
			return ul4._find(obj, sub, start, end);
		}

		public static rfind( obj: any[], sub: any[], start: number | null = null, end: number | null = null ) {
			return ul4._rfind(obj, sub, start, end);
		}
	}
	ul4.expose(ul4.ListProtocol.append, ["*items"]);
	ul4.expose(ul4.ListProtocol.insert, ["pos", "*items"]);
	ul4.expose(ul4.ListProtocol.pop, ["pos=", -1]);
	ul4.expose(ul4.ListProtocol.count, ["sub", "start=", null, "end=", null]);
	ul4.expose(ul4.ListProtocol.find, ["sub", "start=", null, "end=", null]);
	ul4.expose(ul4.ListProtocol.rfind, ["sub", "start=", null, "end=", null]);


	export class StrProtocol extends Protocol {

		public static attrs = helpers._makeset(
			"split",
			"rsplit",
			"splitlines",
			"strip",
			"lstrip",
			"rstrip",
			"upper",
			"lower",
			"capitalize",
			"startswith",
			"endswith",
			"replace",
			"count",
			"find",
			"rfind",
			"join"
		);

		public static ul4type() {
			return "str";
		}

		public static count(obj: string, sub: string, start: number | null = null, end: number | null = null ) {
			return ul4._count(obj, sub, start, end);
		}

		public static find( obj: string, sub: string, start: number | null = null, end: number | null = null ) {
			return ul4._find( obj, sub, start, end );
		}

		public static rfind( obj: string, sub: string, start: number | null = null, end: number | null = null ) {
			return ul4._rfind( obj, sub, start, end );
		}

		public static replace( obj: string, old: string, new_: string, count: number | null = null ) {
			if (count === null)
				count = <number>obj.length;

			let result = [];
			while (obj.length)
			{
				let pos = obj.indexOf(old);
				if (pos === -1 || !count--)
				{
					result.push(obj);
					break;
				}
				result.push(obj.substr(0, pos));
				result.push(new_);
				obj = obj.substr(pos + old.length);
			}
			return result.join("");
		}

		public static strip( obj: string, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("strip() requires a string argument");

			while (obj && chars.indexOf(obj[0]) >= 0)
				obj = obj.substr(1);
			while (obj && chars.indexOf(obj[obj.length-1]) >= 0)
				obj = obj.substr(0, obj.length-1);
			return obj;
		}

		public static lstrip( obj: string, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("lstrip() requires a string argument");

			while (obj && chars.indexOf(obj[0]) >= 0)
				obj = obj.substr(1);
			return obj;
		}

		public static rstrip( obj: string, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("rstrip() requires a string argument");

			while (obj && chars.indexOf(obj[obj.length-1]) >= 0)
				obj = obj.substr(0, obj.length-1);
			return obj;
		}

		public static split( obj: string, sep: string | null = null, count: number | null = null ): string[] {
			if (sep !== null && typeof(sep) !== "string")
				throw new ul4.TypeError("split() requires a string");

			if (count === null)
			{
				let result = obj.split(sep !== null ? sep : /[ \n\r\t]+/);
				if (sep === null)
				{
					if (result.length && !result[0].length)
						result.splice(0, 1);
					if (result.length && !result[result.length-1].length)
						result.splice(-1);
				}
				return result;
			}
			else
			{
				if (sep !== null)
				{
					let result = [];
					while (obj.length)
					{
						let pos = obj.indexOf(sep);
						if (pos === -1 || !count--)
						{
							result.push(obj);
							break;
						}
						result.push(obj.substr(0, pos));
						obj = obj.substr(pos + sep.length);
					}
					return result;
				}
				else
				{
					let result = [];
					while (obj.length)
					{
						obj = ul4.StrProtocol.lstrip(obj, null);
						let part;
						if (!count--)
							 part = obj; // Take the rest of the string
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

		public static rsplit( obj: string, sep: string | null = null, count: number | null = null ): string[] {
			if (sep !== null && typeof(sep) !== "string")
				throw new ul4.TypeError("rsplit() requires a string as second argument");

			if (count === null)
			{
				let result = obj.split(sep !== null ? sep : /[ \n\r\t]+/);
				if (sep === null)
				{
					if (result.length && !result[0].length)
						result.splice(0, 1);
					if (result.length && !result[result.length-1].length)
						result.splice(-1);
				}
				return result;
			}
			else
			{
				if (sep !== null)
				{
					let result = [];
					while (obj.length)
					{
						let pos = obj.lastIndexOf(sep);
						if (pos === -1 || !count--)
						{
							result.unshift(obj);
							break;
						}
						result.unshift(obj.substr(pos+sep.length));
						obj = obj.substr(0, pos);
					}
					return result;
				}
				else
				{
					let result = [];
					while (obj.length)
					{
						obj = ul4.StrProtocol.rstrip(obj);
						let part;
						if (!count--)
							 part = obj; // Take the rest of the string
						else
						{
							part = obj.split(/[ \n\r\t]+/);
							part = part[part.length-1];
						}
						if (part.length)
							result.unshift(part);
						obj = obj.substr(0, obj.length-part.length);
					}
					return result;
				}
			}
		}

		public static splitlines( obj: string, keepends: boolean = false ): string[] {
			let pos = 0;
			let lookingAtLineEnd = function lookingAtLineEnd()
			{
				let c = obj[pos];
				if (c === '\n' || c == '\u000B' || c == '\u000C' || c == '\u001C' || c == '\u001D' || c == '\u001E' || c == '\u0085' || c == '\u2028' || c == '\u2029')
					return 1;
				if (c === '\r')
				{
					if (pos == length-1)
						return 1;
					if (obj[pos+1] === '\n')
						return 2;
					return 1;
				}
				return 0;
			};

			let result = [], length = obj.length;

			for ( let pos = 0, startpos = 0;;)
			{
				if (pos >= length)
				{
					if (startpos != pos)
						result.push(obj.substring(startpos));
					return result;
				}
				let lineendlen = lookingAtLineEnd();
				if (!lineendlen)
					++pos;
				else
				{
					let endpos = pos + (keepends ? lineendlen : 0);
					result.push(obj.substring(startpos, endpos));
					pos += lineendlen;
					startpos = pos;
				}
			}
		}

		public static lower( obj: string ): string {
			return obj.toLowerCase();
		}

		public static upper( obj: string ): string {
			return obj.toUpperCase();
		}

		public static capitalize( obj: string ) {
			if (obj.length)
				obj = obj[0].toUpperCase() + obj.slice(1).toLowerCase();
			return obj;
		}

		public static join( obj: string, iterable: Iterable<string> ) {
			let resultlist = [];
			for (let iter = ul4._iter(iterable);;)
			{
				let item = iter.next();
				if (item.done)
					break;
				resultlist.push(item.value);
			}
			return resultlist.join(obj);
		}

		public static startswith( obj: string, prefix: string | string[] ): boolean {
			if (typeof(prefix) === "string")
				return obj.substr(0, prefix.length) === prefix;
			else if (ul4._islist(prefix))
			{
				for (let singlepre of prefix)
				{
					if (obj.substr(0, singlepre.length) === singlepre)
						return true;
				}
				return false;
			}
			else
				throw new ul4.TypeError("startswith() argument must be string");
		}

		public static endswith( obj: string, suffix: string | string[] ): boolean {
			if (typeof(suffix) === "string")
				return obj.substr(obj.length-suffix.length) === suffix;
			else if (ul4._islist(suffix))
			{
				for (let singlesuf of suffix)
				{
					if (obj.substr(obj.length-singlesuf.length) === singlesuf)
						return true;
				}
				return false;
			}
			else
				throw new ul4.TypeError("endswith() argument must be string or list of strings");
		}
	}
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


	export class _Set{

		public items: any;
		public __type__: string = "set";

		/**
		 * add items to Set
		 * @param {any[]} items 
		 */
		add(...items: string[]) {
			for (let item of items)
				this.items[item] = true;
		}

		has( item: string ): boolean {
			return this.items[item] ? true : false;
		}
		__getattr__( attrname: string ) {
			let self = this;
			switch (attrname)
			{
				case "add":
					return ul4.expose(["*items"], function add(items: any[]){ self.add(...items); });
				default:
					throw new ul4.AttributeError(this, attrname);
			}
		}

		__contains__( item: string ) {
			return this.items[item] || false;
		}

		__bool__() {
			for (let item in this.items)
			{
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
			for (let item in this.items)
			{
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

		__eq__( other: any ) {
			// We'll check that everything in ``this`` is in ``other``
			// and if both have the same number of items they are equal
			if (ul4._isset(other))
			{
				let count = 0;
				for (let item in this.items)
				{
					if (!other.has(item))
						return false;
					// count the number of items we have
					++count;
				}
				return other.size == count;
			}
			else if (ul4._isul4set(other))
			{
				let count = 0;
				for (let item in this.items)
				{
					if (!other[item])
						return false;
					// count the number of items we have
					++count;
				}
				// Substract the number of items that ``other`` has
				for (let item in other.items)
					--count;
				return count == 0;
			}
			else
				return false;
		}

		__le__( other: any ) {
			// check that ``this`` is a subset of ``other``,
			// i.e. everything in ``this`` is also in ``other``
			if (ul4._isset(other))
			{
				let count = 0;
				for (let item in this.items)
				{
					if (!other.has(item))
						return false;
				}
				return true;
			}
			else if (ul4._isul4set(other))
			{
				let count = 0;
				for (let item in this.items)
				{
					if (!other.items[item])
						return false;
				}
				return true;
			}
			else
				ul4._unorderable("<", this, other);
		}

		__ge__( other: any ) {
			// check that ``this`` is a superset of ``other``,
			// i.e. everything in ``other`` is also in ``this``
			if (ul4._isset(other))
			{
				let result = true;
				other.forEach(function(value: string) {
					if (!other.items[value])
						result = false;
				});
				return result;
			}
			else if (ul4._isul4set(other))
			{
				let count = 0;
				for (let item in other.items)
				{
					if (!this.items[item])
						return false;
				}
				return true;
			}
			else
				ul4._unorderable("<=", this, other);
		}
	}
	export class slice extends Proto {
		public start: string;
		public stop: string;

		constructor( start: string, stop: string ) {
			super();
			this.start = start;
			this.stop = stop;
		}

		__repr__()
		{
			return "slice(" + ul4._repr(this.start) + ", " + ul4._repr(this.stop) + ")";
		}

		__getattr__(attrname: string)
		{
			switch (attrname)
			{
				case "start":
					return this.start;
				case "stop":
					return this.stop;
				default:
					throw new ul4.AttributeError(this, attrname);
			}
		}
	}

	export class Context {

		public vars: any;
		public indents: any;
		public escapes: any;
		private _output: any;

		constructor(vars: any)
		{
			if (vars === null || typeof(vars) === "undefined")
				vars = {};
			this.vars = vars;
			this.indents = [];
			this.escapes = [];
			this._output = [];
		}

		/**
		 *  Return a clone of the ``Context``, but with a fresh empty ``vars`` objects that inherits from the previous one.
		 * This is used by the various comprehensions to avoid leaking loop variables.
		 */
		inheritvars()
		{
			let context = Object.create(this);
			context.vars = Object.create(this.vars);
			return context;
		}

		/** 
		 * Return a clone of the ``Context`` with one additional indentation (this is used by ``RenderAST``) 
		 */
		withindent(indent: any)
		{
			let context = Object.create(this);
			if (indent !== null)
			{
				context.indents = this.indents.slice();
				context.indents.push(indent);
			}
			return context;
		}

		/** 
		 * Return a clone of the ``Context`` with the output buffer replaced (this is used by ``renders`` to collect the output in a separate buffer) 
		 */
		replaceoutput()
		{
			let context = Object.create(this);
			context._output = [];
			return context;
		}

		clone(vars: any)
		{
			return Object.create(this);
		}

		output(value: any)
		{
			for (let escape of this.escapes)
				value = escape(value);
			this._output.push(value);
		}

		getoutput()
		{
			return this._output.join("");
		}

		get(name: string)
		{
			return this.vars[name];
		}

		set(name: string, value: any)
		{
			this.vars[name] = value;
		}
	} 

	export class Tag extends AST {

		public template: any;
		public tag: any;
		public codepos: number;
		public code: any;
		public text: any;

		_eval(){return null};

		constructor(template: any, tag: any, tagpos: any, codepos: number)
		{
			super(tagpos);
			this.template = template;
			this.tag = tag;
			this.codepos = codepos;
		}

		__getattr__(attrname: string)
		{
			switch (attrname)
			{
				case "template":
					return this.template;
				case "tag":
					return this.tag;
				case "text":
					return this.text;
				case "code":
					return this.code;
				default:
					return super.__getattr__(attrname);
			}
		}
	}

	Object.defineProperty(ul4.Tag.prototype, "text", {
		get: function()
		{
			if (typeof(this.template) !== "undefined")
				return this.template.source.substring(this.pos.start, this.pos.stop);
			else
				return null;
		}
	});

	Object.defineProperty(ul4.Tag.prototype, "code", {
		get: function()
		{
			if (typeof(this.template) !== "undefined")
				return this.template.source.substring(this.codepos.start, this.codepos.stop);
			else
				return null;
		}
	});

	export class Color extends Proto {

		private _r: number;
		private _g: number;
		private _b: number;
		private _a: number;

		constructor(r=0, g=0, b=0, a=255)
		{
			super();
			this._r = r;
			this._g = g;
			this._b = b;
			this._a = a;
		}

		__repr__()
		{
			let r = ul4._lpad(this._r.toString(16), "0", 2);
			let g = ul4._lpad(this._g.toString(16), "0", 2);
			let b = ul4._lpad(this._b.toString(16), "0", 2);
			let a = ul4._lpad(this._a.toString(16), "0", 2);
			if (this._a !== 0xff)
			{
				if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1] && a[0] === a[1])
					return "#" + r[0] + g[0] + b[0] + a[0];
				else
					return "#" + r + g + b + a;
			}
			else
			{
				if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1])
					return "#" + r[0] + g[0] + b[0];
				else
					return "#" + r + g + b;
			}
		}

		__str__()
		{
			if (this._a !== 0xff)
			{
				return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + (this._a/255) + ")";
			}
			else
			{
				let r = ul4._lpad(this._r.toString(16), "0", 2);
				let g = ul4._lpad(this._g.toString(16), "0", 2);
				let b = ul4._lpad(this._b.toString(16), "0", 2);
				let a = ul4._lpad(this._a.toString(16), "0", 2);
				if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1])
					return "#" + r[0] + g[0] + b[0];
				else
					return "#" + r + g + b;
			}
		}

		__iter__(): any
		{
			return {
				obj: this,
				index: 0,
				next: function() {
					if (this.index == 0)
					{
						++this.index;
						return {value: this.obj._r, done: false};
					}
					else if (this.index == 1)
					{
						++this.index;
						return {value: this.obj._g, done: false};
					}
					else if (this.index == 2)
					{
						++this.index;
						return {value: this.obj._b, done: false};
					}
					else if (this.index == 3)
					{
						++this.index;
						return {value: this.obj._a, done: false};
					}
					else
						return {done: true};
				}
			};
		}

		__getattr__(attrname: string)
		{
			let self = this;
			switch (attrname)
			{
				case "r":
					let r = function r(){ return self._r; };
					ul4.expose(r, []);
					return r;
				case "g":
					let g = function g(){ return self._g; };
					ul4.expose(g, []);
					return g;
				case "b":
					let b = function b(){ return self._b; };
					ul4.expose(b, []);
					return b;
				case "a":
					let a = function a(){ return self._a; };
					ul4.expose(a, []);
					return a;
				case "lum":
					let lum = function lum(){ return self.lum(); };
					ul4.expose(lum, []);
					return lum;
				case "hls":
					let hls = function hls(){ return self.hls(); };
					ul4.expose(hls, []);
					return hls;
				case "hlsa":
					let hlsa = function hlsa(){ return self.hlsa(); };
					ul4.expose(hlsa, []);
					return hlsa;
				case "hsv":
					let hsv = function hsv(){ return self.hsv(); };
					ul4.expose(hsv, []);
					return hsv;
				case "hsva":
					let hsva = function hsva(){ return self.hsva(); };
					ul4.expose(hsva, []);
					return hsva;
				case "witha":
					let witha = function witha(a: any){ return self.witha(a); };
					ul4.expose(witha, ["a"]);
					return witha;
				case "withlum":
					let withlum = function withlum(lum: any){ return self.withlum(lum); };
					ul4.expose(withlum, ["lum"]);
					return withlum;
				case "abslum":
					///@ts-ignore
					let abslum = function abslum(lum: any){ return self.abslum(lum); };
					ul4.expose(abslum, ["lum"]);
					return abslum;
				case "rellum":
					///@ts-ignore
					let rellum = function rellum(lum: any){ return self.rellum(lum); };
					ul4.expose(rellum, ["lum"]);
					return rellum;
				default:
					throw new ul4.AttributeError(this, attrname);
			}
		}

		__getitem__(key: number)
		{
			let orgkey = key;
			if (key < 0)
				key += 4;
			switch (key)
			{
				case 0:
					return this._r;
				case 1:
					return this._g;
				case 2:
					return this._b;
				case 3:
					return this._a;
				default:
					throw new ul4.IndexError(this, key);
			}
		}

		__eq__(other: any)
		{
			if (other instanceof ul4.Color)
				return this._r == other._r && this._g == other._g && this._b == other._b && this._a == other._a;
			return false;
		}

		r()
		{
				return this._r;
		}

		g()
		{
			return this._g;
		}

		b()
		{
			return this._b;
		}

		a()
		{
			return this._a;
		}

		lum()
		{
			return this.hls()[1];
		}

		hls()
		{
			let r = this._r/255.0;
			let g = this._g/255.0;
			let b = this._b/255.0;
			let maxc = Math.max(r, g, b);
			let minc = Math.min(r, g, b);
			let h, l, s;
			let rc, gc, bc;

			l = (minc+maxc)/2.0;
			if (minc == maxc)
				return [0.0, l, 0.0];
			if (l <= 0.5)
				s = (maxc-minc) / (maxc+minc);
			else
				s = (maxc-minc) / (2.0-maxc-minc);
			rc = (maxc-r) / (maxc-minc);
			gc = (maxc-g) / (maxc-minc);
			bc = (maxc-b) / (maxc-minc);
			if (r == maxc)
				h = bc-gc;
			else if (g == maxc)
				h = 2.0+rc-bc;
			else
				h = 4.0+gc-rc;
			h = (h/6.0) % 1.0;
			return [h, l, s];
		}

		hlsa()
		{
			let hls = this.hls();
			return hls.concat(this._a/255.0);
		}

		hsv()
		{
			let r = this._r/255.0;
			let g = this._g/255.0;
			let b = this._b/255.0;
			let maxc = Math.max(r, g, b);
			let minc = Math.min(r, g, b);
			let v = maxc;
			if (minc == maxc)
				return [0.0, 0.0, v];
			let s = (maxc-minc) / maxc;
			let rc = (maxc-r) / (maxc-minc);
			let gc = (maxc-g) / (maxc-minc);
			let bc = (maxc-b) / (maxc-minc);
			let h;
			if (r == maxc)
				h = bc-gc;
			else if (g == maxc)
				h = 2.0+rc-bc;
			else
				h = 4.0+gc-rc;
			h = (h/6.0) % 1.0;
			return [h, s, v];
		}

		hsva()
		{
			let hsv = this.hsv();
			return hsv.concat(this._a/255.0);
		}

		witha(a: number)
		{
			if (typeof(a) !== "number")
				throw new ul4.TypeError("witha() requires a number");
			return new ul4.Color(this._r, this._g, this._b, a);
		}

		withlum(lum: any)
		{
			if (typeof(lum) !== "number")
				throw new ul4.TypeError("witha() requires a number");
			let hlsa = this.hlsa();
			return ul4._hls(hlsa[0], lum, hlsa[2], hlsa[3]);
		}

		ul4type()
		{
			return "color";
		}
	}

	// --Classes--

	export class Exception extends Error {
		public cause: any;
		constructor( message: string ) {
			super( message );
			this.name = "UL4 Exception";
		}

		/**
		 * 
		 * @param attrname 
		 * @throws {ul4.AttributeError}
		 */
		public __getattr__( attrname: string ) {
			switch (attrname)
			{
				case "cause":
					return this.cause;
				default:
					throw new ul4.AttributeError(this, attrname);
			}
		}
	}

	export class IndexError extends Exception {
		public obj: any;
		public index: any;
		constructor(obj: any, index: any)
		{
			super("index " + ul4._repr(index) + " out of range");
			this.obj = obj;
			this.index = index;
		}

		toString()
		{
			return "index " + this.index + " out of range for " + ul4._type(this.obj);
		}
	}
	export class SyntaxError extends ul4.Exception{};

	export class LValueRequiredError extends SyntaxError
	{
		constructor()
		{
			super("lvalue required");
		}
	}
	export class LocationError extends Exception {

		private location: any;
		public cause: string;

		constructor( location: any, cause: string ) {
			super( "nested exception in " + ul4._repr(location) );
			this.location = location;
			this.cause  = cause;

		}
	}

	export class InternalException extends Exception {

	}

	export class ArgumentError extends Exception {}

	export class TypeError extends Exception {};

	export class AttributeError extends Exception {
		public obj: any;
		public attrname: string;
		constructor( obj: any, attrname: string) {
			super("object of type " + ul4._type(obj) + " has no attribute " + ul4._repr(attrname));
			this.obj = obj;
			this.attrname = attrname;
		}
	}

	export class ValueError extends ul4.Exception {};

}

export namespace ul4on {
	
	let _registry: any = {}

	/**
	 * Register the constructor function ``f`` under the name ``name`` with the UL4ON machinery
	 * @param name 
	 * @param f 
	 */
	export function register( name: string, f: Function ) {
		f.prototype.ul4onname = name;
		_registry[name] = f;
	}

	/**
	 * Return a string that contains the object ``obj`` in the UL4ON serialization format
	 * @param obj 
	 * @param indent 
	 */
	export function dumps( obj: any, indent: any ) {
		let encoder = new Encoder( indent );
		encoder.dump( obj );
		return encoder.finish();
	}

	export function loads( data: any, registry: any = null ) {
		let decoder = new Decoder( data, registry );
		return decoder.load();
	}

	export class Encoder {
		public data: any[];
		public indent: any;
		private _level: number;
		private _strings2index: any;
		private _ids2index: any;
		private _backrefs: number;
		/**
		 * create a new Encoder object
		 * @param ident 
		 */
		constructor( indent: any = null ) {
			this.data = [];
			this._level = 0;
			this._strings2index = {};
			this._ids2index = {};
			this._backrefs = 0;
		}

		private _line( line: string, ...args: any[] ) {
			if( this.indent !== null ) {
				for( let i = 0; i < this._level; ++i )
					this.data.push( this.indent );
			}
			else {
				if( this.data.length )
					this.data.push( " " );
			}
			this.data.push( line );

			if( args.length ) {
				let oldindent = this.indent;
				this.indent = null;
				for (let arg of args)
					this.dump(arg);
				this.indent = oldindent;
			}
			if (this.indent !== null)
				this.data.push("\n");
		}

		/**
		 * return the complete string written to the buffer
		 */
		public finish(): string {
			return this.data.join("");
		}

		public dump( obj: any ) {
			if( obj === null ) {
				this._line( "n" );
			}
			else if( typeof( obj ) === "boolean" ) {
				this._line(obj ? "bT" : "bF");
			}
			else if ( typeof( obj ) === "number" ) {
				let type: string = (Math.round(obj) == obj) ? "i" : "f";
				this._line(type + obj);
			}
			else if( typeof( obj ) === "string" ) {
				let index = this._strings2index[obj];
				if ( typeof( index ) !== "undefined" )
				{
					this._line( "^" + index );
				}
				else
				{
					this._strings2index[obj] = this._backrefs++;
					let dump = ul4._str_repr( obj ).replace( "<", "\\x3c" );
					this._line( "S" + dump );
				}
			}
			else if( ul4._iscolor( obj ) )
				this._line( "c", obj.r(), obj.g(), obj.b(), obj.a() );
			else if ( ul4._isdate( obj ) )
				this._line("x", obj.year(), obj.month(), obj.day() );
			else if ( ul4._isdatetime( obj ) )
				this._line("z", obj.getFullYear(), obj.getMonth()+1, obj.getDate(), obj.getHours(), obj.getMinutes(), obj.getSeconds(), obj.getMilliseconds() * 1000);
			else if ( ul4._istimedelta( obj ) )
				this._line("t", obj.days(), obj.seconds(), obj.microseconds());
			else if ( ul4._ismonthdelta( obj ) )
				this._line("m", obj.months());
			else if ( obj instanceof ul4.slice )
				this._line("r", obj.start, obj.stop );
			else if ( obj.ul4onname && obj.ul4ondump ) {
				if ( obj.__id__ ){
					let index = this._ids2index[obj.__id__];
					if ( typeof( index ) != "undefined")
					{
						this._line( "^" + index );
						return;
					}
					this._ids2index[obj.__id__] = this._backrefs++;
				}
				this._line( "O", obj.ul4onname );
				++this._level;
				obj.ul4ondump( this );
				--this._level;
				this._line( ")" );
			}
			else if ( ul4._islist( obj ) ) {
				this._line("l");
				++this._level;
				for( let item of obj )
					this.dump( item );
				--this._level;
				this._line( "]" );
			}
			else if ( ul4._ismap( obj ) ) {
				this._line( "e" );
				++this._level;
				for( let [key, value] of obj.entries() ) {
					this.dump( key );
					this.dump( value );
				}
				--this._level;
				this._line( "}" );
			}
			else if( ul4._isdict( obj ) ) {
				this._line( "d" );
				++this._level;
				for ( let key in obj ) {
					this.dump( key );
					this.dump( obj[key] );
				}
				--this._level;
				this._line("}");
			}
			else if( ul4._isset( obj ) ) {
				this._line( "y" );
				++this._level;
				for ( let item of obj.values() )
					this.dump(item);
				--this._level;
				this._line( "}" );
			}
			else 
				throw new ul4.ValueError( "can't create UL4ON dump of object " + ul4._repr(obj) )
		}
	}

	export class Decoder {
		public pos: number;
		public backrefs: any[];
		public stack: any[];
		public data: any;
		public registry: any;

		constructor( data: any, registry: any = null ) {
			this.data = data || null;
			this.registry = registry;
			this.pos = 0;
			this.backrefs = [];
			this.stack = []; // Use for informative error messages
		}

		public load() {};
	}
}