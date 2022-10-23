import { isNotEmpty } from 'src/app/utils/utils-function';

export abstract class Filter {

    public nullOrPrimaryKeys(field: any, mapFunction: Function = (v) => v.id): "" | Array<any> {
        return (field && field.map) ? field.map(value => mapFunction(value)) : ""
    }

    public nullOrNameValue(field: any, mapFunction: Function = (v) => v.name): "" | Array<any> {
        return (field && field.map) ? field.map(value => mapFunction(value)) : ""
    }

    public isNotEmpty(): boolean {
        return Object.keys(this).reduce((result, key) => isNotEmpty(this[key]) || result, false);
    }

    public toNameMap(): Map<string, any> {
        return new Map<string, any>();
    }

    public abstract copy(): Filter;

    public abstract toQureryMap(): Map<string, any>


}