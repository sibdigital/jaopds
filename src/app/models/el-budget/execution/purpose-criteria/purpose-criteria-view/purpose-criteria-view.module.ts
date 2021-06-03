import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurposeCriteriaViewComponent} from "./purpose-criteria-view.component";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PurposeCriteriaViewComponent
  ],
  exports: [
    PurposeCriteriaViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PurposeCriteriaViewModule { }
