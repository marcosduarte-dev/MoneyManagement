import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultComponent } from './admin/default/default.component';
import { SidebarComponent } from './admin/shard/sidebar/sidebar.component';
import { ContasComponent } from './admin/Components/contas/contas.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './public/login/login.component';
import { ProfileComponent } from './public/profile/profile.component';
import { CadastrarContasComponent } from './admin/Components/contas/components/cadastrar-contas/cadastrar-contas.component';

const Ux_modules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
];

const primeng_modules = [
  CardModule,
  InputTextModule,
  ButtonModule,
  MenuModule,
  TieredMenuModule,
  DialogModule,
  InputNumberModule,
  DropdownModule,
  ToastModule,
  MessageModule,
  MessagesModule,
  DynamicDialogModule,
];

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SidebarComponent,
    ContasComponent,
    LoginComponent,
    ProfileComponent,
    CadastrarContasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    Ux_modules,
    primeng_modules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
