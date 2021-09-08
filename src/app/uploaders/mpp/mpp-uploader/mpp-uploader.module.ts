import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MppUploaderComponent} from "./mpp-uploader.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {ProjectModalSelectorModule} from "../../../models/opsd/projects/project-modal-selector/project-modal-selector.module";
import {ProjectSelectModule} from "../../../models/opsd/projects/project-select/project-select.module";
import {WorkPackageSelectModule} from "../../../models/opsd/work-packages/work-package-select/work-package-select.module";
import {PurposeCriteriaViewModule} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-view/purpose-criteria-view.module";
import {TargetSelectModule} from "../../../models/opsd/targets/target-select/target-select.module";
import {WorkPackageModalSelectorModule} from "../../../models/opsd/work-packages/work-package-modal-selector/work-package-modal-selector.module";
import {TargetModalSelectorModule} from "../../../models/opsd/targets/target-modal-selector/target-modal-selector.module";



@NgModule({
  declarations: [
    MppUploaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,

    ProjectModalSelectorModule,
    MatTableModule,
  ]
})
export class MppUploaderModule { }
