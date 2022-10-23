import { Injectable, TemplateRef } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class TemplateProvider {

    private templates: Map<string, TemplateRef<any>>;

    constructor() {
        this.templates = new Map<string, TemplateRef<any>>();
    }

    public registerTemplate(name: string, template: TemplateRef<any>): void {
        if (template) {
            this.templates.set(name, template);
        }
    }

    public removeTemplate(templateName: string): void {
        this.templates.delete(templateName);
    }

    public getTemplate(templateName: string): TemplateRef<any> {
        return this.templates.get(templateName);
    }
}