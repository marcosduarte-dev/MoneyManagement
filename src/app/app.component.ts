import { Component } from '@angular/core';
import { PublicService } from './public/services/public.service';
import { Router } from '@angular/router';
import { AuthService } from './public/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moneyManagement';
  msg: any;
  logado: boolean = false;

  mostrarNavbar: boolean = true;
  mostrarSidenav: boolean = true;

  isShowing: boolean = true;

  constructor(private publicService: PublicService, private router: Router) {

  }

  ngOnInit(): void {
    this.showMessage();
    this.Estiverlogado();

    AuthService.habilitarNavbar.subscribe((resp: boolean) => this.ativarNavbar(resp));
    AuthService.habilitarSidenav.subscribe((resp: boolean) => this.ativarSidenav(resp));

    console.log(this.mostrarNavbar)
  }

  showMessage() {
    this.publicService.getMessage().subscribe(data => {
      this.msg = data,
      console.log(this.msg)
    })
  }

  ativarSidenav(resposta: boolean) {
    this.mostrarSidenav = resposta;
  }

  ativarNavbar(resposta: boolean) {
    this.mostrarNavbar = resposta;
  }

  Estiverlogado() {
    if (sessionStorage.getItem("currentUser") == null) {
      this.logado = false;
    } else {
      this.logado = true;
    }
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard'])
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
}
