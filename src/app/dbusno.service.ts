import { Injectable } from "@angular/core";


@Injectable()
export class DbusnoService {
    public dbusno: number;

    constructor() { }

    setdbusno(dbusno: number) {
        this.dbusno = dbusno;
    }

    getdbusno() {
        return this.dbusno;
    }
}
