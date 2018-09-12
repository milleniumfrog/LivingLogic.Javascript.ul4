type _js_date = Date;
export declare namespace ul4 {
    function _unorderable(operator: string, obj1: any, obj2: any): void;
    function expose(f: any, signature: any, options?: any): void;
    function _find(obj: any, sub: any, start?: number | null, end?: number | null): any;
    function _eq(obj1: any, obj2: any): boolean;
    function _bound(value: number, upper: number): number;
    function _count(obj: any, sub: any, start?: number | null, end?: number | null): number;
    function _isul4set(obj: any): boolean;
    function _isstr(obj: any): boolean;
    function _iscolor(obj: any): boolean;
    function _isdate(obj: any): boolean;
    function _isdatetime(obj: any): boolean;
    function _istimedelta(obj: any): boolean;
    function _ismonthdelta(obj: any): boolean;
    function _islist(obj: any): boolean;
    function _ismap(obj: any): boolean;
    function _isdict(obj: any): boolean;
    function _isset(obj: any): boolean;
    function _isobject(obj: any): boolean;
    function _isiter(obj: any): boolean;
    function _repr(obj: any): string;
    function _repr_internal(obj: any, ascii: boolean): any;
    function _object_repr(obj: any, ascii?: boolean): string;
    function _set_repr(obj: any, ascii?: boolean): string;
    function _map_repr(obj: any, ascii?: boolean): string;
    function _list_repr(obj: any, ascii?: boolean): string;
    function _datetime_repr(obj: any, ascii?: boolean): string;
    function _date_repr(obj: any, ascii?: boolean): string;
    function _str_repr(str: string, ascii?: boolean): string;
    function _lpad(string: string | number, pad: string, len: number): string;
    function _type(obj: any): string;
    function _rfind(obj: any, sub: any, start?: number | null, end?: number | null): any;
    function _iter(obj: any): {
        index: number;
        next: Function;
    };
    class PROTO {
    }
    class Proto {
        __id__: number;
        constructor();
        ul4type(): string;
        __eq__(other: any): boolean;
        __ne__(other: any): boolean;
        __bool__(): boolean;
    }
    class Date extends Proto {
        _date: _js_date;
        constructor(year: number, month: number, day: number);
        ul4type(): string;
        __repr__(): string;
        __str__(): string;
        __eq__(other: any): boolean;
        __lt__(other: any): boolean | undefined;
        __le__(other: any): boolean | undefined;
        __gt__(other: any): boolean | undefined;
        __ge__(other: any): boolean | undefined;
        year(): number;
        month(): number;
        day(): number;
    }
    class Signature extends Proto {
        args: any[];
        argNames: any;
        remargs: any;
        remkwargs: any;
        constructor(...args: any[]);
        bindArray(name: string, args: any[], kwargs: any[]): any[];
    }
    class Protocol {
        static attrs: Set<string> | ul4._Set;
        static ul4type(): string;
        static dir(): void;
        static get(obj: any): typeof Protocol;
        static getattr(obj: any, attrname: string): any;
        static hasattr(obj: any, attrname: string): boolean;
    }
    class DateProtocol extends Protocol {
        static ul4type(): string;
    }
    class ListProtocol extends Protocol {
        static attrs: _Set | Set<string>;
        static ul4type(): string;
        static append(obj: any[], items: any[]): null;
        static insert(obj: any[], pos: number, items: any[]): null;
        static pop(obj: any[], pos: number): any;
        static count(obj: any[], sub: any[], start?: number | null, end?: number | null): number;
        static find(obj: any[], sub: any[], start?: number | null, end?: number | null): any;
        static rfind(obj: any[], sub: any[], start?: number | null, end?: number | null): any;
    }
    class StrProtocol extends Protocol {
        static attrs: _Set | Set<string>;
        static ul4type(): string;
        static count(obj: string, sub: string, start?: number | null, end?: number | null): number;
        static find(obj: string, sub: string, start?: number | null, end?: number | null): any;
        static rfind(obj: string, sub: string, start?: number | null, end?: number | null): any;
        static replace(obj: string, old: string, new_: string, count?: number | null): string;
        static strip(obj: string, chars?: string | null): string;
        static lstrip(obj: string, chars?: string | null): string;
        static rstrip(obj: string, chars?: string | null): string;
        static split(obj: string, sep?: string | null, count?: number | null): string[];
        static rsplit(obj: string, sep?: string | null, count?: number | null): string[];
        static splitlines(obj: string, keepends?: boolean): string[];
        static lower(obj: string): string;
        static upper(obj: string): string;
        static capitalize(obj: string): string;
        static join(obj: string, iterable: Iterable<string>): string;
        static startswith(obj: string, prefix: string | string[]): boolean;
        static endswith(obj: string, suffix: string | string[]): boolean;
    }
    class _Set {
        items: any;
        __type__: string;
        add(...items: string[]): void;
        has(item: string): boolean;
        __getattr__(attrname: string): void;
        __contains__(item: string): any;
        __bool__(): boolean;
        __repr__(): string;
        __eq__(other: any): boolean;
        __le__(other: any): boolean | undefined;
        __ge__(other: any): boolean | undefined;
    }
    class slice {
        start: string;
        stop: string;
        constructor(start: string, stop: string);
    }
    class Exception extends Error {
        cause: any;
        constructor(message: string);
        __getattr__(attrname: string): any;
    }
    class ArgumentError extends Exception {
    }
    class TypeError extends Exception {
    }
    class AttributeError extends Exception {
        obj: any;
        attrname: string;
        constructor(obj: any, attrname: string);
    }
    class ValueError extends ul4.Exception {
    }
}
export declare namespace ul4on {
    function register(name: string, f: Function): void;
    function dumps(obj: any, indent: any): string;
    function loads(data: any, registry?: any): void;
    class Encoder {
        data: any[];
        indent: any;
        private _level;
        private _strings2index;
        private _ids2index;
        private _backrefs;
        constructor(indent?: any);
        private _line;
        finish(): string;
        dump(obj: any): void;
    }
    class Decoder {
        pos: number;
        backrefs: any[];
        stack: any[];
        data: any;
        registry: any;
        constructor(data: any, registry?: any);
        load(): void;
    }
}
export {};
