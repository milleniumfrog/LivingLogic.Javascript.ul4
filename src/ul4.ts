export namespace helper {

}
export namespace ul4 {
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

}

export namespace ul4on {
	
	
	let _registry: any = {};
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
	})();
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
	})();
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
	})();
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
		let encoder: Encoder = new Encoder( indent );
	}

	export function loads( data: any, registry?: any ) {
		let decoder: Decoder = new Decoder( data, registry );
		return decoder.load();
	}

	export class Encoder {
		public data: any[];
		private _level: number;
		private _strings2index: any;
		private _ids2index: any;
		private _backrefs: number;
		/**
		 * create a new Encoder object
		 * @param ident 
		 */
		constructor( public ident: any = null ) {
			this.data = [];
			this._level = 0;
			this._strings2index = {};
			this._ids2index = {};
			this._backrefs = 0;
		}
	}

	export class Decoder {
		public pos: number;
		public backrefs: any[];
		public stack: any[];
		constructor( public data: any, public registry: any = null ) {
			this.pos = 0;
			this.backrefs = [];
			this.stack = []; // Use for informative error messages
		}
		load() {};
	}
}