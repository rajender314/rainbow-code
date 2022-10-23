import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSettings } from 'src/models/app.models';
import { AuthenticationService } from '../authentication/auth.service';
@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings$: BehaviorSubject<UserSettings>;

  constructor(private authService: AuthenticationService) {
    this.settings$ = new BehaviorSubject<UserSettings>(this.defaultSettings());
    this.authService.currentUser.pipe(untilDestroyed(this)).subscribe(user => {
      const settings = (user) ? user.settings : {};
      this.replaceSettings(settings);
    })
  }

  public get settings(): Observable<UserSettings> {
    return this.settings$.asObservable();
  }

  private defaultSettings(): UserSettings {
    return null;
  }

  private replaceSettings(settings: UserSettings): void {
    this.settings$.next(settings);
  }

  public updateSettings(settings: Partial<UserSettings>): UserSettings {
    const snapshot = this.settings$.getValue();
    const updatedSettings = { ...snapshot, ...settings };
    this.replaceSettings(updatedSettings)
    return updatedSettings;
  }

}
