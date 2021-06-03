import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectSelectComponent} from "./project-select.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

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
    MatSelectModule
  ]
})
export class ProjectSelectModule { }
