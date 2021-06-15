import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {WorkPackage} from "../work-package.model";
import {WorkPackageService} from "../work-package.service";
import {Project} from "../../projects/project.model";
import {FormControl} from "@angular/forms";
import {augmentAppWithServiceWorker} from "@angular-devkit/build-angular/src/utils/service-worker";

@Component({
  selector: 'app-work-package-select',
  templateUrl: './work-package-select.component.html',
  styleUrls: ['./work-package-select.component.scss'],
})
export class WorkPackageSelectComponent implements OnInit {

  @Input() selectedWorkPackage: WorkPackage | undefined;
  @Output() outputSelectedWorkPackage = new EventEmitter<any>();
  workPackages: WorkPackage[] | undefined;

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


   async fillAllByProjectAndSetSelected(project: Project, workPackage: WorkPackage) {
    if (project) {
      let workPackageList : WorkPackage[] = [];
      var response = await this.workPackageService.getAllByProjectId(project.id).toPromise();
      await response.forEach((item) => workPackageList.push(WorkPackage.fromJSON(item)));
      this.workPackages = workPackageList;
      this.selectedWorkPackage = await this.workPackages.find(item => item.id == workPackage.id);
    }
      console.log(this.workPackages);
      console.log(this.selectedWorkPackage);
    }


  onChange(newValue: WorkPackage) {
    this.selectedWorkPackage = newValue;
    this.outputSelectedWorkPackage.emit(newValue)
  }

}
