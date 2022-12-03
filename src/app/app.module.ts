import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DefaultComponent } from './admin/default/default.component';
import { SidebarComponent } from './admin/shard/sidebar/sidebar.component';

const Ux_modules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
]

@NgModule({
  declarations: [AppComponent, DefaultComponent, SidebarComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule, Ux_modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
