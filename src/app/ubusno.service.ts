import { Injectable } from "@angular/core";


@Injectable()
export class UbusnoService {
    public dbusno: number;

    constructor() { }

    setubusno(dbusno: number) {
        this.dbusno = dbusno;
    }

    getubusno() {
        return this.dbusno;
    }
}
