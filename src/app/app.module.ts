import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ExecutionUploaderModule} from "./uploaders/el-budget/execution-uploader/execution-uploader.module";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProjectModalSelectorComponent } from './models/opsd/projects/project-modal-selector/project-modal-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectModalSelectorComponent,
  ],
    imports: [
      FlexLayoutModule,
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      ExecutionUploaderModule,
      AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
