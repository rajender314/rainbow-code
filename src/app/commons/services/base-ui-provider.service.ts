import { UIAction, ComponentInput } from '../models/common.models';
import { componentInputMap } from './data-provider.service';
import { isNotNull, isFunction } from 'src/app/utils/utils-function';

export class BaseUIProvider {

    protected buildAction(action: UIAction, component: any): any {
        const data = this.getActionData(action, (response: any) => {
            component.dismiss(response.data, response.role);
        })
        Object.freeze(data);
        const backupData = componentInputMap.data;
        componentInputMap.data = data;
        return backupData;
    }

    protected getActionData(options: UIAction, dismissHandler: Function): ComponentInput {
        let params = options.params ? options.params : {};
        return {
            parameters: params,
            css: options.cssClasses,
            onClose: (data: any, role: string) => {
                dismissHandler({ role: role, data: data });
            }
        }
    }

    protected buildResponseHandler(component: Promise<any>, backup: any, action: UIAction): void {
        component.then(m => {
            m.onDidDismiss().then(response => {
                componentInputMap.data = backup;
                this.handleOutput(response, action);
            });
            m.present();
        });
    }


    private handleOutput(response: any, action: UIAction) {
        if (isNotNull(response) && response.role == 'selected') {
            this.executeHandler(response.data, action);
        }
    }

    protected executeHandler(data: any, action: UIAction): void {
        const handler = action.selectHandler;
        console.log(data);
        if (isFunction(handler)) {
            handler(data);
        }
    }
}