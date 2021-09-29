import { Component, OnInit } from '@angular/core';
import { UserService } from '@rmb-monorepo/shared/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rmb-monorepo-login-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.html'],
})
export class RemoteEntryComponent implements OnInit {
  loginForm = FormGroup;
  loading = false;
  submitted = false;
  username = '';
  password = '';

  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.username + '::' + this.password);
    // this.loginForm = new FormGroup({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    // });

    this.userService.checkCredentials(this.username, this.password);
  }

  get f() {
    return this.loginForm;
  }

  async login() {
    this.submitted = true;
    console.log(this.username + ':LOGIN:' + this.password);
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm) {
      // if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      await this.userService.checkCredentials(this.f.name, this.f.name);
      // this.router.navigate([this.returnUrl]);
    } catch (error) {
      console.error('Error occurred during login.', error);
      // this.alertService.error(error);
      this.loading = false;
      // this.authinvalid = true;
    }
  }
}
