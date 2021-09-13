import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {Project} from "../../../models/opsd/projects/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MppUploaderService} from "./shared/mpp-uploader.service";
import {MatStepper} from "@angular/material/stepper";
import {ProjectService} from "../../../models/opsd/projects/shared/project.service";
import {WorkPackage} from "../../../models/opsd/work-packages/work-package.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-mpp-uploader',
  templateUrl: './mpp-uploader.component.html',
  styleUrls: ['./mpp-uploader.component.scss']
})
export class MppUploaderComponent implements AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper | undefined;

  isLinear: boolean;

  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  projectIsMatched : boolean;
  selectProjectVisible: boolean;
  selectedProject: Project | undefined;
  newProjectName: string;
  selectedFiles: FileList | undefined;
  selectedFileText = '';

  displayedColumns: string[] = ['id', 'subject'];
  createdWorkPackages: WorkPackage[] = [];

  projectId: number | undefined = undefined;

  constructor(
    private mppUploaderService: MppUploaderService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _formBuilder: FormBuilder,
  ) {
    this.isLinear = true;
    this.isLinear = false;
    this.projectIsMatched = false;
    this.selectProjectVisible = true;
    this.newProjectName = "";

    this.activatedRoute.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.zeroFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (data) => {
            this.selectedProject = data;
        }
      )
    }

  }

  ngOnInit(): void {
    this.isLinear = true;
    this.isLinear = false;
    this.projectIsMatched = false;
    this.selectProjectVisible = true;
    this.newProjectName = "";
  }

  projectRadioChange(event: MatRadioChange):void {
    if (event.value == 1) {
      this.selectProjectVisible = true;
    } else if (event.value == 2) {
      this.selectProjectVisible = false;
    }
  }

  getOutputProject(outputProject: Project) {
    this.selectedProject = outputProject;
  }

  setNewProjectName(event: any):void {
    this.newProjectName = event.value;
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

  resetResultStep():void {
  }

  startProcessFile(): void {
    if (this.selectedFiles) {
      this.isLinear = false;

      var currentFileUpload = this.selectedFiles.item(0) as File;
      this.resetResultStep();
      this.mppUploaderService.processMppFile(currentFileUpload, this.selectedProject?.id, this.newProjectName).subscribe(
        response => {
            this.createdWorkPackages = response;
        }
      )
    }
  }

  openWorkPackage(row: any): void {
    window.open(environment.url + "/projects/" + row?.project?.id + "/work_packages/" + row?.id, "_blank");
  }
}
