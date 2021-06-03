import {
  AfterContentInit, AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  Input, Output, ViewChild
} from '@angular/core';
import {ExecutionUploaderService} from "./shared/execution-uploader.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from "../../../models/opsd/projects/project.model";
import {WorkPackageSelectComponent} from "../../../models/opsd/work-packages/work-package-select/work-package-select.component";
import {WorkPackage} from "../../../models/opsd/work-packages/work-package.model";
import {JavaResponseBody} from "../../../models/java-response-body/java-response-body.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PurposeCriteria} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria.model";
import {PurposeCriteriaViewComponent} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-view/purpose-criteria-view.component";
import {TargetSelectComponent} from "../../../models/opsd/targets/target-select/target-select.component";
import {TargetService} from "../../../models/opsd/targets/target.service";
import {Target} from "../../../models/opsd/targets/target.model";
import {PurposeCriteriaMonthlyExecutions} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-monthly-executions.model";
import {PurposeCriteriaMonthlyExecution} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria-monthly-execution.model";
import {MatStepper} from "@angular/material/stepper";
import {HttpErrorResponse} from "@angular/common/http";
import {ProjectSelectComponent} from "../../../models/opsd/projects/project-select/project-select.component";

interface TargetMatch {
  purposeCriteria: PurposeCriteria;
  target: Target | undefined;

  // constructor(purposeCriteria: PurposeCriteria, target: Target | undefined) {
  //   this.purposeCriteria  = purposeCriteria,
  //   this.target = target;
  // }
}


@Component({
  selector: 'execution-uploader',
  templateUrl: 'execution-uploader.component.html',
  styleUrls: ['execution-uploader.component.scss']
})

export class ExecutionUploaderComponent implements AfterViewInit{
  @Input() selectButtonText = 'Выберите файл';
  @Input() selectFilesButtonType: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() uploadButtonText = 'Начать загрузку';
  @Input() uploadButtonType: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() allowMultipleFiles = false;
  @Input() showUploadButton = true;
  @Input() acceptedTypes = '*.*';
  @Input() financeResultText = '';
  @Input() targetResultText = '';

  @Input() outputTarget: Target | undefined;

  @ViewChild('fileInput') fileInputRef: ElementRef | undefined;
  @ViewChild('projectSelectComponent') projectSelectComponent: ProjectSelectComponent | undefined;
  @ViewChild('workPackageSelectComponent') workPackageSelectComponent: WorkPackageSelectComponent | undefined;
  @ViewChild('targetMatchTable') targetMatchTable: HTMLTableElement | undefined;
  @ViewChild('stepper') stepper: MatStepper | undefined;

  isLinear: boolean;

  secondSpinnerVisible: boolean;
  thirdSpinnerVisible: boolean;
  targetTableVisible: boolean;
  processTargetBtnVisible: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  authorId: number = 0;
  selectedProject: Project | undefined;
  selectedWorkPackage: WorkPackage | undefined;
  selectedFiles: FileList | undefined;
  selectedFileText = '';

  targetMatches: TargetMatch[];
  targetsByProject: Target[] | undefined;
  purposeCriteriaList: PurposeCriteria[];

  displayedColumns: string[] = ['el-budget', 'opsd'];


  constructor(private executionUploaderService: ExecutionUploaderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public _formBuilder: FormBuilder,
              private targetService: TargetService) {
    this.isLinear = true;
    this.isLinear = false;

    this.purposeCriteriaList = [];
    this.targetMatches = [];

    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.targetTableVisible = false;
    this.processTargetBtnVisible = false;

    // this.secondStepStatus = false;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLinear = true;
    this.isLinear = false;

    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.targetTableVisible = false;
    this.processTargetBtnVisible = false;

    this.activatedRoute.queryParams.subscribe(params => {
      this.authorId = params['authorId'];
    });
  }

  ngAfterViewInit(): void {
    this.projectSelectComponent?.getAllProjectsAndSet();
  }

  getOutputProject(outputProject: Project) {
    this.selectedProject = outputProject;
    this.workPackageSelectComponent?.fillAllByProjectId(outputProject)
  }

  getOutputWorkPackage(outputWorkPackage: WorkPackage) {
    this.selectedWorkPackage = outputWorkPackage;
  }

  getOutputTarget(outputSelectedTarget: Target, targetMatch: TargetMatch) {
    targetMatch.target = outputSelectedTarget;
  }

  filesChanged(event: any): void {
    const target = event.target as HTMLInputElement;
    this.selectedFiles = target.files as FileList;
    if (this.selectedFiles) {
      this.isLinear = false;
      const numSelectedFiles = this.selectedFiles.length;
      this.selectedFileText =
        numSelectedFiles === 1
          ? this.selectedFiles[0].name
          : `${numSelectedFiles} files selected`;
    } else {
      this.selectedFileText = ''
    }
  }

  startProcessFile(): void {
    if (this.selectedFiles && this.selectedWorkPackage) {
      var currentFileUpload = this.selectedFiles.item(0) as File;
      this.resetResultStep();
      this.processFinance(currentFileUpload, this.selectedWorkPackage);
    }
  }

  resetResultStep():void {
    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.financeResultText = "";
    this.targetMatches = []
  }

  processFinance(file: File, workPackage: WorkPackage) {
    this.executionUploaderService.processFinance(file, workPackage, this.authorId)
      .subscribe(
    response => {
          this.secondSpinnerVisible = false;
          this.financeResultText = response.cause;
          this.stepper?.next()
          this.matchPurposeCriteria(file, workPackage);
        },
    error => {
          this.secondSpinnerVisible = false;

          if (error.error.cause) {
            this.financeResultText = error.cause;
          } else {
            this.financeResultText = "Не удалось загрузить файл. " + error.statusText;
          }
        })
  }

  matchPurposeCriteria(file: File, workPackage: WorkPackage) {
    this.executionUploaderService.processPurposeCriteria(file, workPackage)
      .subscribe(
        (response:TargetMatch[]) => {
                let completenessTargets = this.checkСompletenessTargets(response);
                if (completenessTargets) {
                  this.processTarget(response);
                } else {
                  this.thirdSpinnerVisible = false;
                  this.targetTableVisible = true;
                  this.processTargetBtnVisible = true;
                  if (this.selectedProject) {
                    this.targetService.getAllByProjectId(this.selectedProject.id)
                      .subscribe((data) => this.targetsByProject = data);
                  }
                  this.targetMatches = response;
                }
              },
        error => {
                this.thirdSpinnerVisible = false;
                this.targetResultText = "Не удалось загрузить целевые показатели. ";
                if (error instanceof HttpErrorResponse) {
                  this.targetResultText = this.targetResultText + "Ошибка: " + error.status;
                }
              }
      )
  }

  processTarget(targetMatches: TargetMatch[]) {
    if (this.selectedWorkPackage) {
      this.executionUploaderService.processTargets(targetMatches, this.selectedWorkPackage, this.authorId)
        .subscribe(
          (response) => {
                  this.thirdSpinnerVisible = false;
                  this.targetResultText = response.cause;
        },
          error => {
                  this.thirdSpinnerVisible = false;
                  this.targetResultText = "Не удалось загрузить целевые показатели. ";
                  if (error instanceof HttpErrorResponse) {
                    this.targetResultText = this.targetResultText + "Ошибка: " + error.status;
                  }
          })
    }
  }

  continueProcessTarget() {
    this.thirdSpinnerVisible = true;
    this.processTargetBtnVisible = false;
    this.targetTableVisible = false;
    this.processTarget(this.targetMatches);
  }

  checkСompletenessTargets(targetMatches: TargetMatch[]) {
    let isComplete = true;
    targetMatches.forEach(targetMatch => {
      if (!targetMatch.target) {
        isComplete = false;
      }
    });

    return isComplete;
  }
}
