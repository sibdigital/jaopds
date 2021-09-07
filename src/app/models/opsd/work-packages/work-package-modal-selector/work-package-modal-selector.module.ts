import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {WorkPackageModalSelectorComponent} from "./work-package-modal-selector.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ProjectModalSelectorDialogModule} from "../../projects/project-modal-selector/project-modal-selector-dialog/project-modal-selector-dialog.module";
import {MatDialogModule} from "@angular/material/dialog";
import {WorkPackageModalSelectorDialogComponent} from "./work-package-modal-selector-dialog/work-package-modal-selector-dialog.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {WorkPackageModalSelectorDialogModule} from "./work-package-modal-selector-dialog/work-package-modal-selector-dialog.module";



@NgModule({
  declarations: [
    WorkPackageModalSelectorComponent,
  ],
  exports: [
    WorkPackageModalSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    WorkPackageModalSelectorDialogModule
  ]
})
export class WorkPackageModalSelectorModule { }
