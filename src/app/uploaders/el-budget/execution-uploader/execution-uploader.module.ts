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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PurposeCriteriaViewModule} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-view/purpose-criteria-view.module";
import {TargetSelectModule} from "../../../models/opsd/targets/target-select/target-select.module";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {ProjectModalSelectorModule} from "../../../models/opsd/projects/project-modal-selector/project-modal-selector.module";
import {WorkPackageModalSelectorModule} from "../../../models/opsd/work-packages/work-package-modal-selector/work-package-modal-selector.module";

@NgModule({
  declarations: [
    ExecutionUploaderComponent
  ],
    imports: [
        // HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        CommonModule,
        FormsModule,

        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatIconModule,

        ProjectSelectModule,
        WorkPackageSelectModule,
        ReactiveFormsModule,
        PurposeCriteriaViewModule,
        TargetSelectModule,
        ProjectModalSelectorModule,
        WorkPackageModalSelectorModule
    ]
})
export class ExecutionUploaderModule { }
