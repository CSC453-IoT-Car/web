import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BackendService } from './backend.service'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, 
  MatCheckboxModule, 
  MatGridListModule, 
  MatCardModule,
  MatRadioModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule
  ],
  entryComponents: [
    AppComponent
  ],
  providers: [ BackendService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
