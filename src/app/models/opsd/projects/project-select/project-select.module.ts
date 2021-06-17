import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectSelectComponent} from "./project-select.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    ProjectSelectComponent
  ],
  exports: [
    ProjectSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProjectSelectModule { }
