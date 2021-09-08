import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../projects/project.model";
import {WorkPackage} from "../work-package.model";
import {environment} from "../../../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {WorkPackageModalSelectorDialogComponent} from "./work-package-modal-selector-dialog/work-package-modal-selector-dialog.component";

@Component({
  selector: 'app-work-package-modal-selector',
  templateUrl: './work-package-modal-selector.component.html',
  styleUrls: ['./work-package-modal-selector.component.scss']
})
export class WorkPackageModalSelectorComponent implements OnInit {

  @Input() selectedWorkPackage: WorkPackage | undefined;
  @Output() outputSelectedWorkPackage = new EventEmitter<any>();
  project: Project | undefined;
  disabled: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  chooseWorkPackage(): void{
    const dialogRef = this.dialog.open(WorkPackageModalSelectorDialogComponent,
      {
        minWidth: 0.8 * window.innerWidth,
        maxWidth: 0.8 * window.innerWidth,
        data: {
          project: this.project
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.selectedWorkPackage = result.data;
        this.outputSelectedWorkPackage.emit(result.data)
      }
    });
  }

  openWorkPackage(event: any){
    event.stopPropagation();
    if (this.selectedWorkPackage) {
      window.open(environment.url + "/projects/" + this.project?.id + "/work_packages/" + this.selectedWorkPackage?.id, "_blank");
    }
  }

  setProjectAndResetWorkPackage(project: Project) {
    this.project = project;
    this.selectedWorkPackage = undefined;
  }

  setWorkPackage(workPackage: WorkPackage) {
    this.selectedWorkPackage = workPackage;
  }

  disableChoice(){
    this.disabled = true;
  }

  enableChoice(){
    this.disabled = false;
  }

}
