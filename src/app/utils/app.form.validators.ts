import { AbstractControl, FormControl } from "@angular/forms";

export function requiredFileType(type: string) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (type.toLowerCase() !== extension.toLowerCase()) {
                return {
                    requiredFileType: true
                };
            }

            return null;
        }

        return null;
    };
}

export function minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': { valid: false } };
    }
}

export function maxLengthArray(max: number) {
    return (c: AbstractControl): { [key: string]: any } => {
        if (c.value.length <= max)
            return null;

        return { 'maxLengthArray': { valid: false } };
    }
}