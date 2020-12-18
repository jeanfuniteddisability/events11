import { stringify } from '@angular/compiler/src/util';

export class mdlSettings {
    legal: string;
    privacy: string;
    eventConditions: string;
    eventNotification: string;
    bookNotification: string;
    tobeconfirmNotification: string;
    confirmNotification: string;

    constructor() {
        this.legal = '';
        this.privacy = '';
        this.eventConditions = '';
        this.eventNotification = '';
        this.bookNotification = '';
        this.tobeconfirmNotification = '';
        this.confirmNotification = '';
    }
}