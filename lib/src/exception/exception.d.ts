import { StatusCode } from 'core';
export declare class Exception {
    private type;
    private status;
    private message;
    private sender;
    private meta?;
    static api(): Exception;
    static business(): Exception;
    static internal(): Exception;
    withMessage(message: string): this;
    withMeta(meta: any): this;
    from(sender: any): this;
    withStatusCode(code: StatusCode): this;
}
