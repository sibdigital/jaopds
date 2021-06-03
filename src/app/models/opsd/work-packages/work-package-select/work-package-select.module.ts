import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkPackageSelectComponent} from "./work-package-select.component";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    WorkPackageSelectComponent],
  exports: [
    WorkPackageSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class WorkPackageSelectModule { }
