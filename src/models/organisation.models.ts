import { Organisation, OrganisationNode } from './app.models';
import { isNotNull, isNull } from '../app/utils/utils-function';

export class OrganisationImpl implements Organisation {

    private _root: OrganisationNode;

    constructor(source: any | OrganisationImpl) {
        if (source instanceof OrganisationImpl) {
            this._createOrgWithExistingOrg(source as OrganisationImpl);
            return;
        }
        this._createOrgWithRaw(source);
    }

    private _createOrgWithExistingOrg(source: OrganisationImpl): void {
        this._root = { ...source._root };
    }

    private _createOrgWithRaw(source: any): void {
        if (isNotNull(source)) {
            const map = new Map<string, any>();
            Object.keys(source).forEach(node => {
                map.set(source[node].id, source[node]);
            });
            let root = null;
            map.forEach((node, id) => {
                if (node.parent_id) {
                    const orgNode = map.get(node.parent_id);
                    orgNode.child = node;
                } else {
                    root = node;
                }
            })
            this._root = root;
        }
    }

    public get root(): any {
        return this._root;
    }

    public static copy(sourceOrg: Partial<Organisation>): Organisation {
        return new OrganisationImpl(sourceOrg);
    }
}