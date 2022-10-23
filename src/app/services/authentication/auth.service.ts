import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, forkJoin } from 'rxjs';
import { BaseAPI, PostRequest } from '../api/base.api';
import { map, mergeMap, timestamp, catchError, tap, mergeAll } from 'rxjs/operators';
import { Plugins } from '@capacitor/core'
import { Login, UserDetail,LoginOtp } from 'src/models/app.models';
import { isNotBlank, isNotNull } from 'src/app/utils/utils-function';
import { apiDirectory } from 'src/global'
const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private TOKEN_KEY = "rainbow_token_key"
    private USER_KEY = "rainbow_user_key"
    private user: BehaviorSubject<UserDetail>;
    private token: string;
    public params:any
    constructor(private baseAPI: BaseAPI) {
        this.user = new BehaviorSubject(null);
    }

    public loadAuthContext(): Promise<UserDetail> {
        return forkJoin({
            token: from(Storage.get({ "key": this.TOKEN_KEY })),
        }).pipe(
            map(entry => this.mapEntry(entry.token)),
            map(token => this.updateToken(token)),
            mergeMap(() => this.fetchCurrentUser()),
            catchError(error => of(null)))
            .toPromise()
    }

    private mapEntry(entry: { value: string; }): string {
        return entry.value;
    }

    public get currentUser(): Observable<UserDetail> {
        return this.user.asObservable()
    }

    public get authToken(): Observable<string> {
        return of(this.token)
    }

    

    public login(login: Login): Observable<UserDetail> {
        const loginForm: any = new FormData();
        loginForm.append("username", login.username);
        loginForm.append("password", login.password);
        const headers: Map<string, string> = new Map<string, string>();
        const request: PostRequest<FormData> = { body: loginForm, url: apiDirectory.login, headers: headers }
        return this.baseAPI.executePost(request)
            .pipe(
                map(response => this.processResponse(response)),
                mergeMap(() => this.fetchCurrentUser())
            );
    }
    
    public loginOtp(loginOtp: LoginOtp): Observable<UserDetail> {
    const params = new Map<string, string>(this.params);
    params.set("mobileNumber", loginOtp.mobnum);
    params.set("otp", loginOtp.otp);
        return this.baseAPI.executeGet({
            url: apiDirectory.loginOtpNum,
            params: params,
          })
            .pipe(
                map(response => this.processResponse(response)),
                mergeMap(() => this.fetchCurrentUser())
            );
    }
    

    private fetchCurrentUser(): Observable<UserDetail> {
        if (isNotBlank(this.token)) {
            return this.baseAPI.executeGet({ url: apiDirectory.userDetails })
                .pipe(
                    map((user: UserDetail) => this.updateUser(user)),
                    map((user: UserDetail) => this.updateAuthState(user)),
                    catchError(error => {
                        this.updateToken(null);
                        this.updateUser(null);
                        this.updateAuthState(null);
                        return of(null)
                    })
                );
        }
        return of(null);
    }

    private updateAuthState(user: UserDetail): UserDetail {
        this.user.next(user);
        return user;
    }

    private updateUser(user: UserDetail): UserDetail {
        if (user) {
            Storage.set({ key: this.USER_KEY, value: JSON.stringify(user) })
            return user;
        }
        Storage.remove({ key: this.USER_KEY })
        return null;
    }

    public logout(): Observable<UserDetail> {
        this.updateToken(null);
        this.updateUser(null);
        this.updateAuthState(null);
        return of(null)
    }

    private processResponse(response: { token: any; }): string {
        return this.updateToken(response.token);
    }

    private updateToken(token: string): string {
        if (isNotBlank(token)) {
            this.token = token;
            Storage.set({ key: this.TOKEN_KEY, value: token })
            return token;
        }
        this.token = null;
        Storage.remove({ key: this.TOKEN_KEY })
        return token;


    }

}