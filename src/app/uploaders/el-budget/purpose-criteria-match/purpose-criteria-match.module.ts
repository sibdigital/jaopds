import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {PurposeCriteriaViewComponent} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-view/purpose-criteria-view.component";
import {PurposeCriteriaMatchComponent} from "./purpose-criteria-match.component";

@NgModule({
  declarations: [
    PurposeCriteriaMatchComponent
  ],
  exports: [
  PurposeCriteriaMatchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CommonModule,
    FormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class PurposeCriteriaMatchModule { }
