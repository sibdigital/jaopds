import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {WorkPackage} from "../work-package.model";
import {WorkPackageService} from "../work-package.service";
import {Project} from "../../projects/project.model";
import {FormControl} from "@angular/forms";
import {augmentAppWithServiceWorker} from "@angular-devkit/build-angular/src/utils/service-worker";
import {error} from "@angular/compiler/src/util";
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {scan} from "rxjs/operators";

@Component({
  selector: 'app-work-package-select',
  templateUrl: './work-package-select.component.html',
  styleUrls: ['./work-package-select.component.scss'],
})
export class WorkPackageSelectComponent implements OnInit {

  @Input() selectedWorkPackage: WorkPackage | undefined;
  @Output() outputSelectedWorkPackage = new EventEmitter<any>();
  workPackages: WorkPackage[] | undefined;
  project: Project | undefined;
  disabled: boolean = false;
  limit = 20;
  page = 0;
  options = new BehaviorSubject<WorkPackage[]>([]);
  totalPage = 0;
  options$: Observable<WorkPackage[]> | undefined;

  constructor(private workPackageService: WorkPackageService) {
    this.resetOptions();
  }

  resetOptions(): void {
    this.options = new BehaviorSubject<WorkPackage[]>([]);
    this.options$ = this.options.asObservable().pipe(
      scan((acc:any, curr:any) => {
        return [...acc, ...curr];
      }, [])
    );
    this.limit = 20;
    this.page = 0;
    this.totalPage = 0;
  }

  ngOnInit(): void {
  }

  fillAllByProjectId(project: Project) {
    this.project = project;
    this.resetOptions();
    this.getNextBatch();
  }


  fillAllByProjectIdAndSetSelected(projectId: number, workPackage: WorkPackage) {
    let workPackageList : WorkPackage[] = [];
    this.workPackageService.getAllByProjectId(projectId).toPromise().then((response) => {
        response.forEach((item) => workPackageList.push(WorkPackage.fromJSON(item)));
        this.workPackages = workPackageList;
        this.selectedWorkPackage = this.workPackages.find(item => item.id == workPackage.id);
      })
    }

  setWorkPackage(workPackage: any) {
    if (workPackage) {
      this.options = new BehaviorSubject<WorkPackage[]>([workPackage]);
      this.options$ = this.options.asObservable().pipe(
        scan((acc:any, curr:any) => {
          return [...acc, ...curr];
        }, [])
      );
      this.selectedWorkPackage = workPackage;
    }
  }

  getNextBatch() {
    if (this.project) {
      this.workPackageService.getAllByProjectIdAndPageAndSize(this.project.id, this.page, this.limit).subscribe(
        (data) => {
          let wpData: Object[] = data._embedded.workPackages;
          this.totalPage = data.page.totalPages;
          let workPackageList: WorkPackage[] = [];
          wpData.forEach((item) => {
            workPackageList.push(WorkPackage.fromJSON(item));
          });
          this.options.next(workPackageList);
          this.page += 1;
        })
    }
  }

  onChange(newValue: WorkPackage) {
    this.selectedWorkPackage = newValue;
    this.outputSelectedWorkPackage.emit(newValue)
  }

  openWorkPackage(event: any){
    event.stopPropagation();
    if (this.selectedWorkPackage) {
      window.open(environment.url + "/projects/" + this.selectedWorkPackage?.project?.id + "/work_packages/" + this.selectedWorkPackage?.id, "_blank");
    }
  }

  disableSelect(){
    this.disabled = true;
  }

  enableSelect(){
    this.disabled = false;
  }

}
