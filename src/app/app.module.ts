import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ExecutionUploaderModule} from "./uploaders/el-budget/execution-uploader/execution-uploader.module";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MppUploaderModule} from "./uploaders/mpp/mpp-uploader/mpp-uploader.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      FlexLayoutModule,
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      ExecutionUploaderModule,
      MppUploaderModule,
      AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
