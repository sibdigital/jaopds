import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TargetSelectComponent} from "./target-select.component";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    TargetSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule
  ],
  exports: [
    TargetSelectComponent
  ]
})
export class TargetSelectModule { }
