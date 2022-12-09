import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  logado: boolean = false;

  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

    if(sessionStorage.getItem("currentUser") == null) {
      AuthService.habilitarNavbar.emit(false);
      AuthService.habilitarSidenav.emit(false);
    }

   }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    this.Estiverlogado();
  }

  onSubmit() {
    this.authService.login(this.form.controls['username'].value, this.form.controls['password'].value).pipe().subscribe(
      data => {
        console.log(data)
        this.ngOnInit();
      }
    )
  }

  irParaDashboard() {
    this.router.navigateByUrl('/dashboard')
  }

  Estiverlogado() {
    if (sessionStorage.getItem("currentUser") != null) {
      this.irParaDashboard();
    }
  }

}
