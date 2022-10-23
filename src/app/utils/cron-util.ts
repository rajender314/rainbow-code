
export function toCRONExpression(input: CRONModel): string {
    const model: CRONModel = { ...input };
    switch (input.frequency) {
        case 'DAILY':
            model.expression = [model.minute, model.hour, "*", "*", "*"].join(" ");
            break;

        case 'WEEKLY':
            model.expression = [model.minute, model.hour, "*", "*", model.weekDays.join(",")].join(" ");
            break;

        case 'MONTHLY':
            const weekDays = (model.weekDays && model.weekDays.length > 0) ? model.weekDays : ["*"];
            model.expression = [model.minute, model.hour, model.days.join(","), "*", weekDays.join(",")].join(" ");
            break;
    }
    return model.expression;
}

export function fromCRONExpression(expression: string): CRONModel {
    const model: CRONModel = { expression: expression };
    const cronFields = expression.split(" ");
    model.minute = parseInt(cronFields[0]);
    model.hour = parseInt(cronFields[1]);
    model.days = (cronFields[2] == "*") ? null : cronFields[2].split(",").map(day => parseInt(day));
    model.weekDays = (cronFields[4] == "*") ? null : cronFields[4].split(",")
    if (model.days == null && model.weekDays == null) {
        model.frequency = 'DAILY';
    } else if (model.weekDays != null && model.days == null) {
        model.frequency = 'WEEKLY';
    } else if (model.days != null) {
        model.frequency = 'MONTHLY';
    }
    return model;
}

export interface CRONModel {
    frequency?: string;
    weekDays?: Array<string>;
    days?: Array<number>;
    hour?: number;
    minute?: number;
    expression?: string;
}