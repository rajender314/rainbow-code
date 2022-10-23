import { Option } from './common.models';

export class SortParam {
    private _fieldName: string;
    private _order: 'ASC' | 'DESC';
    private _option: Option<any>;

    constructor(fieldName: string, order: 'ASC' | 'DESC', option: Option<any>) {
        this._fieldName = fieldName;
        this._order = order;
        this._option = option;
    }

    public get fieldName() {
        return this._fieldName;
    }

    public get order() {
        return this._order;
    }

    public get option() {
        return this._option;
    }

    public getQueryValue(): string {
        return (this._order == 'ASC') ? this._fieldName : "-" + this._fieldName;
    }
}
