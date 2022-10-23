import { Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserPermissionService } from 'src/app/services/permission/permission.service';
import { isEmpty, isNotEmpty, unsubscribeAll } from 'src/app/utils/utils-function';
import { Permission } from 'src/models/app.models';

@Directive({
  selector: '[adjAuthCheck]'
})
export class AuthCheckDirective implements OnInit {

  @Input()
  private adjAuthCheck: Array<string | Array<string>>;
  private subscriptions: Array<Subscription>;
  public static ALLOWED: string = 'allow';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: UserPermissionService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions = [
        this.permissionService.userPermissions
          .subscribe((userPermissions: Array<Permission>) => {
            if (isNotEmpty(this.adjAuthCheck)) {
              this.handleAuthorization(this.adjAuthCheck, userPermissions)
            }
          })
      ]
    }, 10)
  }

  private handleAuthorization(requiredPermissions: Array<string | Array<string>>, userPermissions: Array<Permission>): void {
    const permissions = isNotEmpty(userPermissions) ? userPermissions : [];
    const allowed = this.checkIfAllowed(requiredPermissions, permissions);
    this.handleView(allowed, this.viewContainer, this.templateRef);
  }


  private hasAllPermissions(requiredPermissions: Array<string>, userPermissions: Array<Permission>): boolean {
    const permissions = isNotEmpty(userPermissions) ? userPermissions : [];
    return this.checkIfAllowed(requiredPermissions, permissions);
  }

  private handleView(createView: boolean, viewContainer: ViewContainerRef, template: TemplateRef<any>): void {
    if (createView) {
      viewContainer.clear()
      viewContainer.createEmbeddedView(template);
    } else {
      viewContainer.clear()
    }
  }

  // ['D', ["A", "B", "C"]]

  private checkIfAllowed(requiredPermissions: Array<string | Array<string>>, userPermissions: Array<Permission>): boolean {
    const initialState: PermissionCheckResult = { hasPermission: true, skip: false };
    const result = requiredPermissions.reduce((currentResult: PermissionCheckResult, permission: string | Array<string>) => {
      if (currentResult.skip) {
        return { ...currentResult };
      }
      const isGroupPermissions = Array.isArray(permission);
      if (isGroupPermissions) {
        const hasGroupPermissions = this.hasAllPermissions(permission as Array<string>, userPermissions);
        return { hasPermission: hasGroupPermissions, skip: hasGroupPermissions }
      }
      const hasPermission = currentResult.hasPermission && (permission == AuthCheckDirective.ALLOWED || this.checkIfPermissionIsAssigned(permission as string, userPermissions))
      return { hasPermission: hasPermission, skip: false }
    }, initialState)
    return result.hasPermission;
  }

  private isSamePermission(permissionName: string, permission: Permission): boolean {
    const permisson_name = (permission.qualified_name) ? permission.qualified_name.toLowerCase() : "";
    const configured_perm = permissionName.toLowerCase()
    return permisson_name === configured_perm
  }

  private checkIfPermissionIsAssigned(permissionToCheck: string, userPermissions: Array<Permission>): boolean {
    const permission = userPermissions.find((permission: Permission) => this.isSamePermission(permissionToCheck, permission))
    return (permission) ? true : false
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }

}


export interface PermissionCheckResult {
  hasPermission: boolean;
  skip: boolean
}