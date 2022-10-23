import { Request } from 'src/app/services/api/base.api';

export class KPIDescriptor {

    private _name: string;
    private _description: string;
    private _valueRequest: Request;
    private _valueFieldName: string;
    private _seriesRequest: Request;
    private _seriesFieldName: string;
    private _role: KPIRole;
    private _primary: boolean;

    constructor(name: string, role: KPIRole, valueRequest: Request, valueFieldName: string) {
        this._name = name;
        this._valueRequest = valueRequest;
        this._valueFieldName = valueFieldName
        this._role = role
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get valueRequest(): Request {
        return this._valueRequest;
    }

    public set valueRequest(valueRequest: Request) {
        this._valueRequest = valueRequest;
    }


    public get valueFieldName(): string {
        return this._valueFieldName;
    }

    public set valueFieldName(valueFieldName: string) {
        this._valueFieldName = valueFieldName;
    }


    public get seriesRequest(): Request {
        return this._seriesRequest;
    }

    public set seriesRequest(seriesRequest: Request) {
        this._seriesRequest = seriesRequest;
    }


    public get seriesFieldName(): string {
        return this._seriesFieldName;
    }

    public set seriesFieldName(seriesFieldName: string) {
        this._seriesFieldName = seriesFieldName;
    }

    public get role(): KPIRole {
        return this._role;
    }

    public set role(role: KPIRole) {
        this._role = role;
    }

    public get primary(): boolean {
        return this._primary;
    }

    public set primary(role: boolean) {
        this._primary = role;
    }

    private cloneRequest(request: Request): Request {
        if (request) {
            const clonedRequest = { ...request };
            const params = (request.params) ? request.params : new Map();
            clonedRequest.params = new Map(params);
            return clonedRequest;
        }
        return null;
    }

    public clone(): KPIDescriptor {
        const valueRequest = this.cloneRequest(this.valueRequest);
        const seriesRequest = this.cloneRequest(this.seriesRequest);
        const kpi = new KPIDescriptor(this.name, this.role, valueRequest, this.valueFieldName)
        kpi.primary = this.primary;
        kpi.seriesRequest = seriesRequest
        kpi.seriesFieldName = this.seriesFieldName;
        kpi.description = this.description;
        return kpi;
    }

}


export enum KPIType {
    CURRENCY = 'currency',
    NUMBER = 'number',
    PERCENTAGE = 'percentage',
    DECIMAL = 'decimal'

}

export class KPIRole {
    private _type: KPIType;
    private _denominator: number;
    private _description: string;

    constructor(type: KPIType, denominator: number, description: string) {
        this._type = type;
        this._denominator = denominator;
        this._description = description;
    }

    public get type() {
        return this._type;
    }

    public get denominator() {
        return this._denominator;
    }

    public get description() {
        return this._description;
    }

}