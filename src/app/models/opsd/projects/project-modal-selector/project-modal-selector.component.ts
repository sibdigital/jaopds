import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Project} from "../project.model";
import {ProjectModalSelectorDialogComponent} from "./project-modal-selector-dialog/project-modal-selector-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {scan} from "rxjs/operators";

@Component({
  selector: 'app-project-modal-selector',
  templateUrl: './project-modal-selector.component.html',
  styleUrls: ['./project-modal-selector.component.scss']
})
export class ProjectModalSelectorComponent implements OnInit {

  @Input() selectedProject: Project | undefined;
  @Output() outputSelectedProject = new EventEmitter<any>();
  disabled: boolean = false;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  chooseProject(): void{
    let matDialogConfig: MatDialogConfig = {
      panelClass: "dialog-responsive",
      autoFocus: false
    }
    const dialogRef = this.dialog.open(ProjectModalSelectorDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.selectedProject = result.data;
        this.outputSelectedProject.emit(result.data)
      }
    });
  }

  openProject(event: any){
    event.stopPropagation();
    if (this.selectedProject) {
      window.open(environment.url + "/projects/" + this.selectedProject?.identifier, "_blank");
    }
  }

  setProject(project: any) {
    if (project) {
      this.selectedProject = project;
    }
  }

  disableChoice() {
    this.disabled = true;
  }

  enableChoice() {
    this.disabled = false;
  }
}
