export declare namespace helper {
}
export declare namespace ul4 {
    class _Set {
        items: any;
        add(...items: any[]): void;
    }
}
export declare namespace ul4on {
    function register(name: string, f: Function): void;
    function dumps(obj: any, indent: any): void;
    function loads(data: any, registry?: any): void;
    class Encoder {
        ident: any;
        data: any[];
        private _level;
        private _strings2index;
        private _ids2index;
        private _backrefs;
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
