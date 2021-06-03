import { NgModule } from '@angular/core';
import {ExecutionUploaderComponent} from "./execution-uploader.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {ProjectSelectModule} from "../../../models/opsd/projects/project-select/project-select.module";
import {WorkPackageSelectModule} from "../../../models/opsd/work-packages/work-package-select/work-package-select.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {PurposeCriteriaViewModule} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-view/purpose-criteria-view.module";
import {TargetSelectModule} from "../../../models/opsd/targets/target-select/target-select.module";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    ExecutionUploaderComponent
  ],
  imports: [
    // HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,

    ProjectSelectModule,
    WorkPackageSelectModule,
    ReactiveFormsModule,
    PurposeCriteriaViewModule,
    TargetSelectModule,
  ]
})
export class ExecutionUploaderModule { }
