import {EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectInfiniteScrollModule} from "ng-mat-select-infinite-scroll";
import {EnumerationDynamicSelectComponent} from "./enumeration-dynamic-select.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    EnumerationDynamicSelectComponent
  ],
  exports: [
    EnumerationDynamicSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSelectInfiniteScrollModule
  ]
})
export class EnumerationDynamicSelectModule {

}
