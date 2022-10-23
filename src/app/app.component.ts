import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/auth.service'
import { isNotNull } from './utils/utils-function';
import { filter, map } from 'rxjs/operators';
import { ApplicationPage, UserDetail } from 'src/models/app.models';
// import { OrganisationService } from './services/organisation/organisation.service';
import { Subscription } from 'rxjs';
import { AuthCheckDirective } from './commons/directives/auth-check/auth-check.directive';
import { TemplateProvider } from './services/templates/template.service';
import { OrganisationService } from './services/organisation/organisation.service';
import { ModalService } from 'src/app/commons/services/modal-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public isSidebarExpanded: boolean;
  public pages: Array<ApplicationPage>
  private forceReload: boolean;
  private defaultPage: string = 'rainbow/dashboard';
  private subscriptions: Array<Subscription> = [];
  public sunRisepages = [];
  public projName = true;

  @ViewChild("geoPlaceTemplate", { read: TemplateRef })
  private geoPlaceTemplate: TemplateRef<any>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private templateProvider: TemplateProvider,
    public orgService: OrganisationService,
    private route: ActivatedRoute,
    public modalService: ModalService,

  ) {
    if (this.orgService.myIndex == 456) {
      console.log("annanananaanna")
    }
    this.isSidebarExpanded = false;
    const subscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => this.activateNavigation(event as NavigationEnd));
    this.subscriptions.push(subscription)
    this.initializeApp();

  }

  private activateNavigation(event: NavigationEnd): void {

    const index = this.projName == true ? this.pages.findIndex(page => page.url == event.urlAfterRedirects) : this.sunRisepages.findIndex(page => page.url == event.urlAfterRedirects)
    if (index > -1) {

      this.selectedIndex = index;
      console.log(this.selectedIndex)
    }
  }

  initializeApp() {
    this.authService.currentUser.pipe(
      map(user => this.mapDefaultURL(user))
    ).subscribe(url => {
      if (url == '/login' && this.forceReload) {
        window.location.reload();
        return;
      } else {
        this.forceReload = true;
      }
      this.router.navigate([url]);
    });

    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.orgService.loadOrgNodes();
      }
    })
    this.orgService.getProjName().subscribe(data => {
      this.projName = data;
    })

    this.pages = this.getPages();
    this.sunRisepages = this.getSunRisePages();
  }

  private mapDefaultURL(user: UserDetail): any {
    return isNotNull(user) ? this.defaultPage : "/login";
  }

  public toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  private getPages(): Array<ApplicationPage> {
    const pages = new Array<ApplicationPage>();
    pages.push({ name: "Dashboard", url: "rainbow/dashboard", icon: "home", permissions: [AuthCheckDirective.ALLOWED] });
    pages.push({ name: "Visits", url: "rainbow/visits", icon: "golf", val: 456, permissions: [AuthCheckDirective.ALLOWED] });
    pages.push({ name: "Stores", url: "rainbow/stores", icon: "business", permissions: [AuthCheckDirective.ALLOWED] });
    // pages.push({ name: "Merchandiser", url: "rainbow/merchandiser", icon: "people", permissions: [AuthCheckDirective.ALLOWED] });
    // pages.push({ name: "Beats", url: "rainbow/beats", icon: "location", permissions: [AuthCheckDirective.ALLOWED] });
    pages.push({ name: "Reports", url: "rainbow/reports", icon: "bar-chart", permissions: [AuthCheckDirective.ALLOWED] });
    pages.push({ name: "User Management", url: "rainbow/user-management", icon: "person-add", permissions: [AuthCheckDirective.ALLOWED] });
    // pages.push({ name: "Settings", url: "/settings", icon: "settings", permissions: [AuthCheckDirective.ALLOWED] });


    return pages;
  }
  private getSunRisePages(): Array<ApplicationPage> {
    const sunRisepages = new Array<ApplicationPage>();
    sunRisepages.push({ name: "Dashboard", url: "/sunrise/dashboard", icon: "home", permissions: [AuthCheckDirective.ALLOWED] });
    sunRisepages.push({ name: "Stores", url: "/sunrise/stores", icon: "business", permissions: [AuthCheckDirective.ALLOWED] });
    return sunRisepages;
  }
  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      })
      this.subscriptions.slice(0);
    }
  }
  ngAfterViewInit(): void {
    this.templateProvider.registerTemplate('geoPlaceTemplate', this.geoPlaceTemplate);

  }
}
