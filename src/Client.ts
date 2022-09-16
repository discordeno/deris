import { EventEmitter } from "events";

export class Client extends EventEmitter {
    /** The options this client */
    options: ClientOptions;

    constructor(options: ClientOptions) {
        super();
        this.options = options;
    }
}

export default Client;

export interface ClientOptions {

}