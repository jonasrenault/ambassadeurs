import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AmbassadeursComponent } from './ambassadeurs/ambassadeurs.component';
import { AmbassadeursService } from './ambassadeurs.service';

@NgModule({
  declarations: [
    AppComponent,
    AmbassadeursComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AmbassadeursService],
  bootstrap: [AppComponent]
})
export class AppModule { }
