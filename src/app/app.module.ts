import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseAPI } from './services/api/base.api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/auth.service';
import { HttpInterceptorService } from './services/api/http.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppCommonModule } from './commons/commons.module';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { LightboxModule } from 'ngx-lightbox';
import { NgImageSliderModule } from 'ng-image-slider';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
// import { NgxGalleryModule } from 'ngx-gallery';

export function initAuthService(authService: AuthenticationService) {
  return () => authService.loadAuthContext();
}

@NgModule({
  declarations: [
    AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    LightboxModule,
    NgImageSliderModule,
    // NgxGalleryModule, 
    IonicModule.forRoot(
      {
        mode: "md"
      }
    ),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTooltipModule,
    AppCommonModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    BaseAPI,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: APP_INITIALIZER, useFactory: initAuthService, multi: true, deps: [AuthenticationService, BaseAPI] },
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
