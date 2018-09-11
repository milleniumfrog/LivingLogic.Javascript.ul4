export namespace ul4 {

	// This is outside of ``Proto`` on purpose
	// This way reactive frameworks like ``Vue.js`` don't get to see it
	// and complain about mutating render functions when those create new objects.
	let _nextid: number = 1;

	// --FUNCTIONS--

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

	/**
	 * check if type is string
	 * @param obj 
	 */
	export function _isstr( obj: any ): boolean {
		return typeof( obj ) === "string";
	}
	// TODO
	export function _iscolor( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _isdate( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _isdatetime( obj: any ): boolean {
		return false;
	}

	//TODO
	export function _istimedelta( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _ismonthdelta( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _islist( obj: any ): boolean {
		return false;
	}

	export function _ismap( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _isdict( obj: any ): boolean {
		return false;
	}

	// TODO
	export function _isset( obj: any ): boolean {
		return false;
	}

	export function _isobject( obj: any ): boolean {
		return Object.prototype.toString.call(obj) == "[object Object]" && typeof(obj.__type__) === "undefined" && !(obj instanceof ul4.Proto);
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
		let date = <Date>obj._date;
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

	// --CLASSES--

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

	export class Protocol {
		public static attrs: any = {};
		public static ul4type(): string {
			return Protocol.constructor.name;
		}
		
		public static dir() {
		}

		public static get( obj: any ) {
			if (ul4._isstr( obj ))
				return ul4.StrProtocol;
			// else if ( ul4._islist(obj) )
			// 	return ul4.ListProtocol;
			// else if ( ul4._isdate(obj) )
			// 	return ul4.DateProtocol;
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
			if (obj === null || typeof(obj) === "undefined")
				throw new ul4.AttributeError(obj, attrname);
			else if (typeof(obj.__getattr__) === "function")
				return obj.__getattr__(attrname);
			else if ( this.attrs.has(attrname))
			{
				let attr = Protocol.attrs[attrname];
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
				return this.attrs.has(attrname);
		}
	}

	export class StrProtocol extends Protocol {

		public static ul4type() {
			return "str";
		}

		public static count(obj: any, sub: any, start: number | null = null, end: number | null = null ) {
			return ul4._count(obj, sub, start, end);
		}

		public static find( obj: any, sub: any, start: number | null = null, end: number | null = null ) {
			return ul4._find( obj, sub, start, end );
		}

		public static rfind( obj: any, sub: any, start: number | null = null, end: number | null = null ) {
			return ul4._rfind( obj, sub, start, end );
		}

		public static replace( obj: any, old: any, new_: any, count: number | null = null ) {
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

		public static strip( obj: any, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("strip() requires a string argument");

			while (obj && chars.indexOf(obj[0]) >= 0)
				obj = obj.substr(1);
			while (obj && chars.indexOf(obj[obj.length-1]) >= 0)
				obj = obj.substr(0, obj.length-1);
			return obj;
		}

		public static lstrip( obj: any, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("lstrip() requires a string argument");

			while (obj && chars.indexOf(obj[0]) >= 0)
				obj = obj.substr(1);
			return obj;
		}

		public static rstrip( obj: any, chars: string | null = null ) {
			chars = chars || " \r\n\t";
			if (typeof(chars) !== "string")
				throw new ul4.TypeError("rstrip() requires a string argument");

			while (obj && chars.indexOf(obj[obj.length-1]) >= 0)
				obj = obj.substr(0, obj.length-1);
			return obj;
		}

	}

	// TODO
	export class _Set{

		public items: any;

	/**
	 * add items to Set
	 * @param {any[]} items 
	 */
		add(...items: any[]) {
			for (let item of items)
				this.items[item] = true;
		}
	}
	// TODO
	export class slice {
		public start: string;
		public stop: string;

		constructor( start: string, stop: string ) {
			this.start = start;
			this.stop = stop;
		}
	}

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
	const _setmap: (map: Map<string, any> | any, key: string, value: any) => void = (function () {
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
	const _emptymap: () => Map<string, any> | any = (function() {
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
	const _emptyset: () => Set<any> | ul4._Set = (function() {
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
	 * @param {any[]} items
	 */
	function _makeset(...items: any[]) {
		let set: Set<any> | ul4._Set = _emptymap();
		for( let item of items ) {
			set.add( item );
		}
		return set;
	}

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