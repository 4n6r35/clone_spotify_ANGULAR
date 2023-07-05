import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  _errorSession: boolean = false
  _formLogin: FormGroup = new FormGroup({});

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this._formLogin.value
    this._authService.sendCredentials(email, password)
      .subscribe(responseOk => {
        console.log('Se ha iniciado seccion correctamente', responseOk);
      },
        err => {
          this._errorSession = true
          console.log('Ha ocurrido un error con email o password')
        })
  }
}
