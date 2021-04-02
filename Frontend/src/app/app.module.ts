import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from "./app.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetHomeComponent } from './views/home/home.component';
import { GetLoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { GetTareasComponent } from './views/tareas/tareas.component';
@NgModule({
  declarations: [
    AppComponent,
    GetHomeComponent,
    GetLoginComponent,
    RegistroComponent,
    GetTareasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
