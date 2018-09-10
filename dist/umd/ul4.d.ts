export declare namespace helper {
}
export declare namespace ul4 {
    class _Set {
        items: any;
        /**
         * add items to Set
         * @param {any[]} items
         */
        add(...items: any[]): void;
    }
}
export declare namespace ul4on {
    /**
     * Register the constructor function ``f`` under the name ``name`` with the UL4ON machinery
     * @param name
     * @param f
     */
    function register(name: string, f: Function): void;
    /**
     * Return a string that contains the object ``obj`` in the UL4ON serialization format
     * @param obj
     * @param indent
     */
    function dumps(obj: any, indent: any): void;
    function loads(data: any, registry?: any): void;
    class Encoder {
        ident: any;
        data: any[];
        private _level;
        private _strings2index;
        private _ids2index;
        private _backrefs;
        /**
         * create a new Encoder object
         * @param ident
         */
        constructor(ident?: any);
    }
    class Decoder {
        data: any;
        registry: any;
        pos: number;
        backrefs: any[];
        stack: any[];
        constructor(data: any, registry?: any);
        load(): void;
    }
}
