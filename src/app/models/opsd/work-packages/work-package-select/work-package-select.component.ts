import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {WorkPackage} from "../work-package.model";
import {WorkPackageService} from "../work-package.service";
import {Project} from "../../projects/project.model";
import {FormControl} from "@angular/forms";
import {augmentAppWithServiceWorker} from "@angular-devkit/build-angular/src/utils/service-worker";
import {error} from "@angular/compiler/src/util";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-work-package-select',
  templateUrl: './work-package-select.component.html',
  styleUrls: ['./work-package-select.component.scss'],
})
export class WorkPackageSelectComponent implements OnInit {

  @Input() selectedWorkPackage: WorkPackage | undefined;
  @Output() outputSelectedWorkPackage = new EventEmitter<any>();
  workPackages: WorkPackage[] | undefined;
  disabled: boolean = false;

  constructor(private workPackageService: WorkPackageService) {
  }

  ngOnInit(): void {
    this.workPackages = [];
  }

  fillAllByProjectId(project: Project) {
    if (project) {
      this.workPackageService.getAllByProjectId(project.id)
        .subscribe(
          (data) => {
          let workPackageList : WorkPackage[] = [];
          data.forEach((item) => workPackageList.push(WorkPackage.fromJSON(item)));
          this.workPackages = workPackageList;
        })
    }
  }


  fillAllByProjectIdAndSetSelected(projectId: number, workPackage: WorkPackage) {
    let workPackageList : WorkPackage[] = [];
    this.workPackageService.getAllByProjectId(projectId).toPromise().then((response) => {
        response.forEach((item) => workPackageList.push(WorkPackage.fromJSON(item)));
        this.workPackages = workPackageList;
        this.selectedWorkPackage = this.workPackages.find(item => item.id == workPackage.id);
      })
    }


  onChange(newValue: WorkPackage) {
    this.selectedWorkPackage = newValue;
    this.outputSelectedWorkPackage.emit(newValue)
  }

  openWorkPackage(event: any){
    event.stopPropagation();
    if (this.selectedWorkPackage) {
      window.open(environment.url + "/projects/" + this.selectedWorkPackage?.projectId + "/work_packages/" + this.selectedWorkPackage?.id, "_blank");
    }
  }

  disableSelect(){
    this.disabled = true;
  }

  enableSelect(){
    this.disabled = false;
  }

}
