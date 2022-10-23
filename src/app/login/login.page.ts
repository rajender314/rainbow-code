import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Login, LoginOtp, UserDetail } from "src/models/app.models";
import { BaseAPI } from "src/app/services/api/base.api";
import { AuthenticationService } from "../services/authentication/auth.service";
import { isNull } from "../utils/utils-function";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BodyComponent } from "../commons/body/body.component";
import { PopoverService } from "../commons/services/popover.service";
import { apiDirectory } from "../../global";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loginNumForm: FormGroup;
  public loginOtpForm: FormGroup;
  public error: string;
  public loginPin: boolean = false;
  public loginOtp: boolean = true;
  public activeButton: boolean = true
  public formSubmitNum: boolean = false;
  public params: Map<string, any>;
  public showBtn: boolean = true;
  public otp: number;
  public otpShow: boolean = false;
  public mobNum: string;
  public errorNum: string;
  public errorOtp: string;
  selected = 0

  @ViewChild(BodyComponent)
  public body: BodyComponent;

  constructor(
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private uiProvider: PopoverService,
    private authService: AuthenticationService,
    private baseAPI: BaseAPI,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
    this.loginNumForm = this.formBuilder.group({
      mobile_num: ["", [Validators.required]],
    });
    this.loginOtpForm = this.formBuilder.group({
      otp: ["", [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(() => (this.error = null));

    this.authService.currentUser.subscribe(
      (user) => this.handleAuthentication(user),
      (error) => console.log(error)
    );
  }

  private handleAuthentication(currentUser: UserDetail): void {
    if (isNull(currentUser)) {
      this.menu.enable(false);
      return;
    }
    this.menu.enable(true);
    return;
  }

  private login(loginModel: Login): void {
    // this.body.startLoading();
    this.authService.login(loginModel).subscribe(
      (response) => this.body.completeLoading(),
      (error) => {
        this.error =
          "Invalid credentials. Please check your username and password.";
        this.uiProvider.showToast(this.error, 2000);
        this.body.completeLoading();
      }
    );
  }
  private loginOtpNum(loginModelOtp: LoginOtp): void {
    if (parseInt(loginModelOtp.otp) != this.otp) {
      this.errorOtp = "Please Enter Valid OTP";
      this.uiProvider.showToast(this.errorOtp, 2000);
    }
    this.authService.loginOtp(loginModelOtp).subscribe(
      (response) => this.body.completeLoading(),
      (error) => {
        this.error = "Please Enter Valid OTP";
        this.uiProvider.showToast(this.error, 2000);
        this.body.completeLoading();
      }
    );
  }

  public submitLogin(): void {
    if (this.loginForm.valid) {
      const loginModel: Login = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.login(loginModel);
    }
  }
  public submitLoginOtp(): void {
    if (this.loginOtpForm.valid) {
      const loginModelOtp = {
        mobnum: this.mobNum,
        otp: this.loginOtpForm.value.otp,
      };
      this.loginOtpNum(loginModelOtp);
    }
  }
  public submitLoginNum(form: any): void {
    this.formSubmitNum = true;
    if (!form.valid) return;
    const params = new Map<string, string>(this.params);
    params.set("mobileNumber", form.value.mobile_num);
    this.mobNum = form.value.mobile_num;
    this.baseAPI
      .executeGet({
        url: apiDirectory.loginOtpNum,
        params: params,
      })
      .subscribe(
        (response) => {
          console.log(response);
          if (response.OTP) {
            this.otpShow = true;
            this.loginOtp = false;
            this.otp = response.OTP;
          } else {
            this.errorNum = response.message;
            this.uiProvider.showToast(this.errorNum, 5000);
          }
        },
        (error) => (this.body.error = error)
      );
  }
  // public submitLoginOtp1(form: any): void {
  //   const params = new Map<string, string>(this.params);
  //   //console.log(form);
  //   params.set("mobileNumber", this.mobNum);
  //   params.set("otp", form.value.otp);

  //   this.baseAPI
  //     .executeGet({
  //       url: apiDirectory.loginOtpNum,
  //       params: params,
  //     })
  //     .subscribe(
  //       (response) => {

  //         if (response.OTP) {
  //           this.otpShow = true;
  //           this.loginOtp = false;
  //           this.otp = response.OTP;
  //         }else{
  //           this.errorOtp = response.message
  //           this.uiProvider.showToast(this.errorOtp, 2000);
  //         }
  //       },
  //       (error) => (this.body.error = error)
  //     );
  // }

  public LoginPin($event: Event): void {
    this.loginPin = true;
    this.loginOtp = false;
    this.showBtn = false;
    this.otpShow = false;
    this.activeButton = false
  }
  public LoginOtp($event: Event): void {
    console.log("otppp")
    this.loginOtp = true;
    this.otpShow = false;
  }

  get f() {
    return this.loginNumForm.controls;
  }
}
