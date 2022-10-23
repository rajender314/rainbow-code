import { UIActionParams } from '../models/common.models';
import { InjectionToken } from '@angular/core';

export const componentInputMap: UIActionParams = { data: null };

export const ACTION_PARAMS = new InjectionToken<UIActionParams>('Action Parameters', {
    providedIn: 'root',
    factory: () => componentInputMap
});