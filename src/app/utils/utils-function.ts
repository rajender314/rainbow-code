import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PaginatedResponse } from '../commons/models/common.models';

export const PRIMARY_COLOR_DARK: string = "#593696" // "#511e60";
export const PRIMARY_COLOR: string = "#7e57c2";
// Color for Upsell
// export const PRIMARY_COLOR_DARK: string = "#511e60";
// export const PRIMARY_COLOR: string = "#622473";

export const DATE_FORMAT: string = "YYYY-MM-DD";
export const SORT_PARAM_NAME: string = 'ordering';

export function graphGradient(context: any, startColor?: string, endColor?: string): any {
    var gradient = context.createLinearGradient(0, 0, 0, 100)
    startColor = (startColor) ? startColor : "#e4dcf2";
    endColor = (endColor) ? endColor : "white";
    gradient.addColorStop(0, startColor)
    gradient.addColorStop(1, endColor)
    return gradient;
}

export function isNotBlank(value: string): boolean {
    return value && value.trim().length > 0;
}

export function isBlank(value: string): boolean {
    return !isNotBlank(value);
}

export function isNotEmpty(value: any[]): boolean {
    return !isEmpty(value);
}

export function isEmpty(value: any[]): boolean {
    return (value == null) || value.length == 0;
}


export function isNotNull(value: any) {
    return (value) ? true : false;
}

export function isNull(value: any): boolean {
    return !isNotNull(value);
}

export function isFunction(type: any): boolean {
    return (type) && typeof type == 'function';
}

export function compareIgnoreCase(leftOp: string, rightOp: string): boolean {
    if ((leftOp == rightOp) ||
        (isNotBlank(leftOp) && isNotBlank(leftOp)
            && leftOp.toLowerCase() == rightOp.toLowerCase())) {
        return true;
    }
    return false;
}

export function isTrue(value: any) {
    return (typeof (value) == "boolean" && value == true) ? true : false;
}

export function isFalse(value: any) {
    return !isTrue(value);
}

export function mergeMapEntries(...args): Map<string, any> {
    const map = new Map<string, any>();
    if (args && args.length > 0) {
        Array.from(arguments).forEach(sourceMap => {
            if (sourceMap && sourceMap instanceof Map) {
                const m = sourceMap as Map<string, any>;
                m.forEach((v, k) => {
                    map.set(k, v);
                });
            }
        });
    }
    return map;
}

export function toCamelCase(str: string, seprator: string = " "): string {
    return (str && typeof str == 'string') ? str.split(seprator).map(v => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase()).join(" ") : "";
}

export function emptyPaginatedResponse(): PaginatedResponse<any> {
    return { page: null, links: null, results: null };
}

export function mergePaginatedResponse(source: PaginatedResponse<any>, destination: PaginatedResponse<any>): PaginatedResponse<any> {
    const response = emptyPaginatedResponse();
    if (isNotNull(source) && isNotNull(destination)) {
        response.links = source.links;
        response.page = source.page;
        response.results = [];
        if (isNotEmpty(destination.results)) {
            response.results.push(...destination.results);
        }
        if (isNotEmpty(source.results)) {
            response.results.push(...source.results);
        }
    }
    return response;
}


export const copyPaginatedResponse = <T>(first: PaginatedResponse<T>, second: PaginatedResponse<T>, equalFn: (item1: T, item2: T) => boolean, mergeData: boolean = false) => {
    const result: PaginatedResponse<T> = { page: null, links: null, results: new Array<T>() };
    result.links = first.links;
    result.page = first.page;
    result.results = [...first.results]
    second.results.forEach(item => {
        const processedItem: T = result.results.find(s => equalFn(s, item));
        if (processedItem) {
            Object.assign(processedItem, item);
        } else {
            result.results.push(item);
        }
    });
    return result;
}

export const mergeFunction = <T>(equalFn: (left: T, right: T) => boolean) => {
    return (head: PaginatedResponse<T>, ...agrs: Array<PaginatedResponse<T>>) => {
        return agrs.reduce((result, response) => {
            return copyPaginatedResponse(result, response, equalFn)
        }, head)
    }
}

export const identityFn = <T>(v: T) => v;


export const mapOf = <K, V>(...args: Array<{ key: K, value: V }>) => {
    return new Map<K, V>(args.map(item => [item.key, item.value]))
}

declare global {
    interface MapConstructor {
        from<K, V>(...args: Array<{ key: K, value: V }>): Map<K, V>
    }
}

Map.from = <K, V>(...args: Array<{ key: K, value: V }>) => {
    return new Map<K, V>(args.map(item => [item.key, item.value]))
}


export function displayStatus(status: string): string {
    return toCamelCase(status, "_")
}

export function unsubscribeAll(subscriptions: Array<Subscription>): void {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        const items = subscriptions.splice(0);
        console.log(`unsubscribed ${items.length} subscriptions`);
    }
}

export function getQualifiedContactNumber(dialCode: string, contactNumber: string) {
    return (contactNumber)
        ? ((contactNumber.startsWith(dialCode)) ? contactNumber : dialCode.concat(contactNumber))
        : null;
}
export function pluck(object: any, fieldName: string, defaultValue: any = null): any | null {
    return (object && Object.keys(object).indexOf(fieldName) > -1) ? object[fieldName] : defaultValue;
}


export function calDivision(numerator: number, denominator: number): number {
    return (denominator) ? parseFloat((numerator / denominator).toFixed(2)) : 0;
}

export function calPercentage(numerator: number, denominator: number): number {
    return (denominator) ? parseFloat(((numerator / denominator) * 100).toFixed(2)) : 0;
}

export function calculateGrowth(currentValue: number, pastValue: number): number {
    return (currentValue && pastValue) ? parseFloat((((currentValue - pastValue) / currentValue) * 100).toFixed(2)) : 0;
}

export function retrieveErrorMessage(error: HttpErrorResponse | any, defaultMessage: string = ""): Array<string> {
    let errors = {
        "error": defaultMessage
    }
    if (error instanceof HttpErrorResponse && error.error) {
        errors = error.error;
    } else if (error.error) {
        errors = error.error;
    }
    return Object.keys(errors).reduce((messages, current) => [...messages, current + ":" + errors[current]], []);
}

export function lc(value: string) {
    return value.toLowerCase();
}