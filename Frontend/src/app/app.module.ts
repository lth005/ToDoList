import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from "./app.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetHomeComponent } from './views/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    GetHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
