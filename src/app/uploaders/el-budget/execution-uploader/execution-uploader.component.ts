import {
  AfterViewInit,
  Component, ElementRef,
  Input, ViewChild
} from '@angular/core';
import {ExecutionUploaderService} from "./shared/execution-uploader.service";
import {ActivatedRoute, Event, Router} from '@angular/router';
import {Project} from "../../../models/opsd/projects/project.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PurposeCriteria} from "../../../models/el-budget/execution/purpose-criteria/purpose-criteria.model";
import {TargetService} from "../../../models/opsd/targets/shared/target.service";
import {Target} from "../../../models/opsd/targets/target.model";
import {MatStepper} from "@angular/material/stepper";
import {HttpErrorResponse} from "@angular/common/http";
import {MatRadioChange} from "@angular/material/radio";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {WorkPackage} from "../../../models/opsd/work-packages/work-package.model";
import {TargetMatch} from "../../../models/target-match.model";
import {environment} from "../../../../environments/environment";
import {CostObject} from "../../../models/opsd/cost-objects/cost-object.model";
import {ProjectModalSelectorComponent} from "../../../models/opsd/projects/project-modal-selector/project-modal-selector.component";
import {WorkPackageModalSelectorComponent} from "../../../models/opsd/work-packages/work-package-modal-selector/work-package-modal-selector.component";
import {TargetModalSelectorComponent} from "../../../models/opsd/targets/target-modal-selector/target-modal-selector.component";
import {ProjectService} from "../../../models/opsd/projects/shared/project.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";



@Component({
  selector: 'execution-uploader',
  templateUrl: 'execution-uploader.component.html',
  styleUrls: ['execution-uploader.component.scss']
})

export class ExecutionUploaderComponent implements AfterViewInit{
  @Input() workPackageResultText = '';
  @Input() financeResultText = '';
  @Input() targetResultText = '';

  @Input() outputTarget: Target | undefined;

  @ViewChild('fileInput') fileInputRef: ElementRef | undefined;
  @ViewChild('projectModalSelectorComponent') projectModalSelectorComponent: ProjectModalSelectorComponent | undefined;
  @ViewChild('workPackageModalSelectorComponent') workPackageModalSelectorComponent: WorkPackageModalSelectorComponent | undefined;
  @ViewChild('targetModalSelectorComponent') targetModalSelectorComponent: TargetModalSelectorComponent | undefined;
  @ViewChild('targetMatchTable') targetMatchTable: HTMLTableElement | undefined;
  @ViewChild('stepper') stepper: MatStepper | undefined;

  isLinear: boolean;
  projectIdFromUrl: number | undefined = undefined;


  selectProjectVisible: boolean;
  selectWorkPackageVisible: boolean;
  workPackageMatRadioGroupVisible: boolean;
  secondSpinnerVisible: boolean;
  thirdSpinnerVisible: boolean;
  targetTableVisible: boolean;
  processTargetBtnVisible: boolean;
  disableTargetToggle: boolean = false;

  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  workPackageIsMatched: boolean;
  newProjectName: string;
  newWorkPackageName: string;
  selectedProject: Project | undefined;
  selectedWorkPackage: WorkPackage | undefined;
  selectedCostObject: CostObject | undefined;
  selectedFiles: FileList | undefined;
  selectedFileText = '';

  targetMatches: TargetMatch[];
  purposeCriteriaList: PurposeCriteria[];
  chosenTargets: Target[];

  displayedColumns: string[] = ['el-budget', 'opsd', 'slider'];


  constructor(private executionUploaderService: ExecutionUploaderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private projectService: ProjectService,
              private targetService: TargetService) {
    this.isLinear = true;
    this.isLinear = false;

    this.newProjectName = "";
    this.newWorkPackageName = "";
    this.purposeCriteriaList = [];
    this.targetMatches = [];
    this.chosenTargets = [];

    this.workPackageIsMatched = false;
    this.selectProjectVisible = true;
    this.workPackageMatRadioGroupVisible = true;
    this.selectWorkPackageVisible = true;
    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.targetTableVisible = false;
    this.processTargetBtnVisible = false;

    // this.secondStepStatus = false;
    this.zeroFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
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
    // this.isLinear = false;

    this.activatedRoute.queryParams.subscribe(params => {
      this.projectIdFromUrl = params['projectId'];
    });

    this.newProjectName = "";
    this.newWorkPackageName = "";

    this.workPackageIsMatched = false;
    this.selectProjectVisible = true;
    this.workPackageMatRadioGroupVisible = true;
    this.selectWorkPackageVisible = true;
    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.targetTableVisible = false;
    this.targetTableVisible = true;
    this.processTargetBtnVisible = false;

  }

  ngAfterViewInit(): void {
    if (this.projectIdFromUrl) {
      this.projectService.getProjectById(this.projectIdFromUrl).subscribe(
        (data) => {
          this.getOutputProject(data);
        }
      )
    }

  }

  getOutputProject(outputProject: Project) {
    this.selectedProject = outputProject;
    this.workPackageModalSelectorComponent?.setProjectAndResetWorkPackage(outputProject);
  }

  getOutputWorkPackage(outputWorkPackage: WorkPackage) {
    this.selectedWorkPackage = outputWorkPackage;
  }

  getOutputTarget(outputSelectedTarget: Target, targetMatch: TargetMatch) {
    targetMatch.target = outputSelectedTarget;
    this.fillChosenTargets(this.targetMatches);
  }

  filesChanged(event: any): void {
    const target = event.target as HTMLInputElement;
    this.selectedFiles = target.files as FileList;
    if (this.selectedFiles) {
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
    if (this.selectedFiles) {
      this.isLinear = false;

      var currentFileUpload = this.selectedFiles.item(0) as File;
      this.resetResultStep();
      this.executionUploaderService.findWorkPackage(currentFileUpload).subscribe(
         response => {
          if (response.cause && response.sname == 'null') {
            this.stepper?.next();
          } else if (response.id) {
              this.setProjectAndWorkPackageInSelect(WorkPackage.fromJSON(response));
              this.stepper?.next(); // на шаг 2
              this.stepper?.next()  // на шаг 3
              this.processFinance(currentFileUpload, WorkPackage.fromJSON(response));
          }
        }
      )
    }
  }

  setProjectAndWorkPackageInSelect(response: WorkPackage){
    try {
      this.workPackageIsMatched = true;
      this.projectModalSelectorComponent?.disableChoice();
      this.workPackageModalSelectorComponent?.disableChoice();
      this.selectProjectVisible = true;
      this.selectWorkPackageVisible = true;

      if (response.project) {
        this.projectModalSelectorComponent?.setProject(response.project);
        this.workPackageModalSelectorComponent?.setProject(response.project);
        this.workPackageModalSelectorComponent?.setWorkPackage(response);
      }
    } catch (error) {
      this._snackBar.open(error);
    }
  }

  projectRadioChange(event: MatRadioChange):void {
    if (event.value == 1) {
      this.selectProjectVisible = true;
      this.workPackageMatRadioGroupVisible = true;
    } else if (event.value == 2) {
      this.selectProjectVisible = false;
      this.workPackageMatRadioGroupVisible = false;
      this.selectWorkPackageVisible = false;
    }
  }

  workPackageRadioChange(event: MatRadioChange):void {
    if (event.value == 1) {
      this.selectWorkPackageVisible = true;
    } else if (event.value == 2) {
      this.selectWorkPackageVisible = false;
    }
  }

  setNewProjectName(event: any):void {
    this.newProjectName = event.value;
  }

  setNewWorkPackageName(event: any):void {
    this.newWorkPackageName = event.value;
  }

  selectOrCreateWorkPackage():void {
    if (this.checkСompletenessWorkPackages() && this.selectedFiles ) {
      var currentFileUpload = this.selectedFiles.item(0) as File;

      if (this.selectWorkPackageVisible) {
        if (this.selectedWorkPackage) {
          this.executionUploaderService.putMetaIdToWorkPackage(currentFileUpload, this.selectedWorkPackage.id).subscribe(
            response => {
              if (response.id && this.selectedWorkPackage) {
                this.processFinance(currentFileUpload, this.selectedWorkPackage);
                this.stepper?.next();
              }
            },
            error => {
              this.workPackageResultText = "Не удалось загрузить в данное мероприятие";
              if (error instanceof HttpErrorResponse) {
                this.workPackageResultText = this.workPackageResultText + " Ошибка: " + error.status;
              }
            }
          )
        }
      } else {
          var projectId = (this.selectProjectVisible) ? this.selectedProject?.id : 0;
          var projectName = (this.selectProjectVisible) ? "" : this.newProjectName;
          this.executionUploaderService.createWorkPackage(currentFileUpload, this.newWorkPackageName, projectId, projectName).subscribe(
            response => {
              if (response.id) {
                this.setProjectAndWorkPackageInSelect(WorkPackage.fromJSON(response))
                this.stepper?.next();
                this.processFinance(currentFileUpload, WorkPackage.fromJSON(response));
              }
            },
            error => {
              this.workPackageResultText = "Не удалось создать мероприятие.";
              if (error instanceof HttpErrorResponse) {
                this.workPackageResultText = this.workPackageResultText + " Ошибка: " + error.status;
              }
            });
      }
    }
  }

  resetResultStep():void {
    // this.workPackageSelectComponent?.enableSelect();
    // this.projectSelectComponent?.enableSelect();
    this.projectModalSelectorComponent?.enableChoice();
    this.workPackageModalSelectorComponent?.enableChoice();
    this.secondSpinnerVisible = true;
    this.thirdSpinnerVisible = true;
    this.workPackageResultText = '';
    this.financeResultText = '';
    this.targetResultText = '';
    this.targetMatches = []
  }

  processFinance(file: File, workPackage: WorkPackage) {
    this.executionUploaderService.processFinance(file, workPackage)
      .subscribe(
    response => {
          if (response.id) {
            this.secondSpinnerVisible = false;
            this.financeResultText = "Бюджет успешно сохранен";
            this.selectedCostObject = response;
            this.stepper?.next()
            this.matchPurposeCriteria(file, workPackage);
          }
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
          response.forEach(match => {match.createNewTarget = false; match.project = this.projectModalSelectorComponent?.selectedProject});

          // if (this.projectModalSelectorComponent?.selectedProject) {
          //   this.targetService.getAllByProjectId(this.projectModalSelectorComponent?.selectedProject.id)
          //     .subscribe((data) => this.targetsByProject = data);
          // }

          this.targetMatches = response;
          let completenessTargets = this.checkСompletenessTargets(response);
          if (completenessTargets) {
            this.processTarget(response);
          } else {
            this.thirdSpinnerVisible = false;
            this.targetTableVisible = true;
            this.processTargetBtnVisible = true;
            this.fillChosenTargets(response);
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
    if (this.workPackageModalSelectorComponent?.selectedWorkPackage) {
      this.executionUploaderService.processTargets(targetMatches, this.workPackageModalSelectorComponent?.selectedWorkPackage)
        .subscribe(
          (response) => {
            // if (this.projectModalSelectorComponent?.selectedProject) {
            //   this.targetService.getAllByProjectId(this.projectModalSelectorComponent?.selectedProject.id)
            //     .subscribe((data) => this.targetsByProject = data);
            // }
            response.forEach(match => {match.project = this.projectModalSelectorComponent?.selectedProject});
            this.targetMatches = response;
            // for (var row in this.targetMatchTable?.rows) {
            //   this.targetSelectComponent?.disableSelect();
            // }
            this.thirdSpinnerVisible = false;
            this.disableTargetToggle = true;
            this.targetResultText = "Целевые показатели сохранены.";
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
    // if (this.checkСompletenessTargets(this.targetMatches)) {
      this.thirdSpinnerVisible = true;
      this.processTargetBtnVisible = false;
      // this.targetTableVisible = false;
      this.processTarget(this.targetMatches);
    // } else {
    //   this._snackBar.open("Не везде установлено сопоставление целевых показателей!", 'Ok', {
    //     duration: 3000
    //   });
    // }
  }

  fillChosenTargets(targetMatches: TargetMatch[]) {
    this.chosenTargets = [];
    targetMatches.forEach(targetMatch => {
      if ((targetMatch.createNewTarget == false) && (targetMatch.target !== null)) {
        this.chosenTargets.push(targetMatch.target);
      }
    });
  }

  checkСompletenessTargets(targetMatches: TargetMatch[]) {
    let isComplete = true;
    targetMatches.forEach(targetMatch => {
      if (targetMatch.createNewTarget && (targetMatch.newTargetName == "" || targetMatch.newTargetName == null)) {
        isComplete = false;
      } else if (!targetMatch.createNewTarget && !targetMatch.target) {
        isComplete = false;
      }
    });

    return isComplete;
  }

  checkСompletenessWorkPackages():boolean {
    let isComplete = true;

    if (this.selectProjectVisible && !this.selectedProject) {
      isComplete = false;
      this.showMessage("Не выбран проект");
    } else if (!this.selectProjectVisible && (this.newProjectName == "" || this.newProjectName == undefined)) {
      isComplete = false;
      this.showMessage("Не заполнен проект");
    } else if (this.selectWorkPackageVisible && !this.selectedWorkPackage) {
      isComplete = false;
      this.showMessage("Не выбрано мероприятие");
    } else if (!this.selectWorkPackageVisible && (this.newWorkPackageName == "" || this.newWorkPackageName == undefined)) {
      isComplete = false;
      this.showMessage("Не заполнено мероприятие");
    }

    return isComplete;
  }

  showMessage(message: string) : void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = "top";
    config.horizontalPosition = 'right';
    config.duration = 2000;

    this._snackBar.open(message, 'x', config);
  }

  changeToggle(targetMatch: TargetMatch, event: MatSlideToggleChange) {
    if (targetMatch.target) {
      event.source.checked = false;
      this._snackBar.open("Уберите выбранный показатель из поля (нажмите Х)", 'Ok', {
        duration: 3000
      });
    } else {
      targetMatch.createNewTarget = !targetMatch.createNewTarget;
      event.source.checked = targetMatch.createNewTarget;
    }
  }

  changeTargetName(targetMatch: TargetMatch, name: String) {
    targetMatch.newTargetName = name;
  }

  openCostObject(event: any) {
    if (this.selectedCostObject) {
      window.open(environment.url + "/cost_objects/" + this.selectedCostObject?.id, "_blank");
    }
  }
}
