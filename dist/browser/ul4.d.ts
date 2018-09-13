type _js_date = Date;
export declare namespace ul4 {
    function _update(obj: any, others: any, kwargs: any): any;
    function _hls(h: number, l: number, s: number, a: number): Color;
    function _rgb(r: number, g: number, b: number, a: number): Color;
    function _date(year: number, month: number, day: number): Date;
    function _isleap(obj: any): boolean;
    function _formatsource(out: string[]): string;
    function _mod(obj1: number, obj2: number): number;
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
    class Proto {
        __id__: number;
        constructor();
        ul4type(): string;
        __eq__(other: any): boolean;
        __ne__(other: any): boolean;
        __bool__(): boolean;
    }
    class TimeDelta extends Proto {
        private _microseconds;
        private _seconds;
        private _days;
        constructor(days?: number, seconds?: number, microseconds?: number);
    }
    class Date extends Proto {
        _date: _js_date;
        constructor(year: number, month: number, day: number);
        ul4type(): string;
        __repr__(): string;
        __str__(): string;
        __eq__(other: any): boolean;
        __lt__(other: any): boolean;
        __le__(other: any): boolean;
        __gt__(other: any): boolean;
        __ge__(other: any): boolean;
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
    abstract class AST extends Proto {
        protected pos: any;
        _ul4onattrs: string[];
        constructor(pos: any);
        __getattr__(attrname: string): any;
        __setitem__(attrname: string, value: any): void;
        __str__(): string;
        __repr__(): string;
        _handle_eval(context: any): any;
        _handle_eval_set(context: any, value: any): void;
        _eval_set(context: any, value: any): void;
        _handle_eval_modify(context: any, operator: any, value: any): void;
        _eval_modify(context: any, operator: any, value: any): void;
        _repr(out: any): void;
        _str(out: any): void;
        ul4ondump(encoder: ul4on.Encoder): void;
        ul4onload(decoder: ul4on.Decoder): void;
        abstract _eval(context: any): any;
    }
    abstract class CodeAST extends AST {
        private tag;
        constructor(tag: any, pos: any);
        _str(out: any): void;
    }
    class ConstAST extends CodeAST {
        private value;
        constructor(tag: any, pos: any, value: any);
        _repr(out: any): void;
        _eval(context: any): any;
    }
    abstract class BinaryAST extends CodeAST {
        _ul4onattrs: string[];
        obj1: any;
        obj2: any;
        constructor(tag: any, pos: any, obj1: any, obj2: any);
        _repr(out: any): void;
        _eval(context: any): any;
        abstract _do(obj1: any, obj2: any): any;
    }
    class ModAST extends BinaryAST {
        _do(obj1: any, obj2: any): number;
        _ido(obj1: any, obj2: any): number;
    }
    class Protocol {
        static attrs: Set<string> | ul4._Set;
        static ul4type(): string;
        static dir(): void;
        static get(obj: any, ...args: any[]): any;
        static getattr(obj: any, attrname: string): any;
        static hasattr(obj: any, attrname: string): boolean;
    }
    class ObjectProtocol extends Protocol {
        static ul4type(): string;
        static getattr(obj: any, attrname: any): any;
        static get(obj: any, key: string, default_?: any): any;
        static items(obj: any): any[][];
        static values(obj: any): any[];
        static clear(obj: any): void;
    }
    class MapProtocol extends Protocol {
        static ul4type(): string;
        static getattr(obj: any, attrname: string): any;
        get(obj: any, key: string, default_?: any): any;
        items(obj: any): any[];
        values(obj: any): any[];
        update(obj: any, other: any, kwargs: any): any;
        clear(obj: any): void;
    }
    class SetProtocol extends Protocol {
        static attr: _Set | Set<string>;
        static ul4type(): string;
        static add(obj: any, items: string): void;
        static clear(obj: Set<string> | _Set): void;
    }
    class DateTimeProtocol extends Protocol {
        static ul4type(): string;
        static weekday(obj: _js_date): number;
        static calendar(obj: _js_date, firstweekday?: number, mindaysinfirstweek?: number): number[];
        static week(obj: any, firstweekday?: number, mindaysinfirstweek?: number): any;
        static day(obj: any): any;
        static month(obj: any): any;
        static year(obj: any): any;
        static hour(obj: any): any;
        static minute(obj: any): any;
        static second(obj: any): any;
        static microsecond(obj: any): number;
        static mimeformat(obj: any): string;
        static isoformat(obj: any): string;
        static yearday(obj: any): any;
    }
    class SubAST extends BinaryAST {
        _do(obj1: any, obj2: any): any;
        _date_sub(obj1: any, obj2: any): TimeDelta;
        _datetime_sub(obj1: any, obj2: any): TimeDelta;
    }
    class DateProtocol extends Protocol {
        static ul4type(): string;
        static weekday(obj: Date): number;
        static calendar(obj: any, firstweekday?: number, mindaysinfirstweek?: number): number[];
        static week(obj: any, firstweekday?: number, mindaysinfirstweek?: number): any;
        static day(obj: any): any;
        static month(obj: any): any;
        static year(obj: any): any;
        static mimeformat(obj: any): string;
        static isoformat(obj: any): string;
        static yearday(obj: any): any;
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
        clear(): void;
        has(item: string): boolean;
        __getattr__(attrname: string): void;
        __contains__(item: string): any;
        __bool__(): boolean;
        __repr__(): string;
        __eq__(other: any): boolean;
        __le__(other: any): boolean;
        __ge__(other: any): boolean;
    }
    class slice extends Proto {
        start: string;
        stop: string;
        constructor(start?: string, stop?: string);
        __repr__(): string;
        __getattr__(attrname: string): string;
    }
    class Context {
        vars: any;
        indents: any;
        escapes: any;
        private _output;
        constructor(vars: any);
        inheritvars(): any;
        withindent(indent: any): any;
        replaceoutput(): any;
        clone(vars: any): any;
        output(value: any): void;
        getoutput(): any;
        get(name: string): any;
        set(name: string, value: any): void;
    }
    class Tag extends AST {
        template: any;
        tag: any;
        codepos: number;
        code: any;
        text: any;
        _eval(): any;
        constructor(template: any, tag: any, tagpos: any, codepos: number);
        __getattr__(attrname: string): any;
    }
    class Color extends Proto {
        private _r;
        private _g;
        private _b;
        private _a;
        constructor(r?: number, g?: number, b?: number, a?: number);
        __repr__(): string;
        __str__(): string;
        __iter__(): any;
        __getattr__(attrname: string): (lum: any) => any;
        __getitem__(key: number): number;
        __eq__(other: any): boolean;
        r(): number;
        g(): number;
        b(): number;
        a(): number;
        lum(): number;
        hls(): number[];
        hlsa(): number[];
        hsv(): number[];
        hsva(): number[];
        witha(a: number): Color;
        withlum(lum: any): Color;
        ul4type(): string;
    }
    class MonthDelta extends Proto {
        private _months;
        constructor(months?: number);
    }
    class Exception extends Error {
        cause: any;
        constructor(message: string);
        __getattr__(attrname: string): any;
    }
    class IndexError extends Exception {
        obj: any;
        index: any;
        constructor(obj: any, index: any);
        toString(): string;
    }
    class SyntaxError extends ul4.Exception {
    }
    class LValueRequiredError extends SyntaxError {
        constructor();
    }
    class LocationError extends Exception {
        private location;
        cause: string;
        constructor(location: any, cause: string);
    }
    class InternalException extends Exception {
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
    let _registry: any;
    function register(name: string, f: Function): void;
    function dumps(obj: any, indent: any): string;
    function loads(data: any, registry?: any): any;
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
        readchar(): any;
        readcharoreof(): any;
        readblackchar(): any;
        read(size: number): any;
        backup(): void;
        readnumber(): number;
        _beginfakeloading(): number;
        _endfakeloading(oldpos: number, value: any): void;
        _readescape(escapechar: string, length: number): string;
        load(): any;
        loadcontent(): {
            next: () => {
                done: boolean;
                value?: undefined;
            } | {
                done: boolean;
                value: any;
            };
        };
    }
}
export {};
