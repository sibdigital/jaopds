import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../projects/project.model";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../../environments/environment";
import {Target} from "../target.model";
import {TargetModalSelectorDialogComponent} from "./target-modal-selector-dialog/target-modal-selector-dialog.component";

@Component({
  selector: 'app-target-modal-selector',
  templateUrl: './target-modal-selector.component.html',
  styleUrls: ['./target-modal-selector.component.css']
})
export class TargetModalSelectorComponent implements OnInit {

  @Input() selectedTarget: Target | undefined;
  @Output() outputselectedTarget = new EventEmitter<any>();
  @Input() project: Project | undefined;
  disabled: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  chooseTarget(): void{
    const dialogRef = this.dialog.open(TargetModalSelectorDialogComponent,
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
        this.selectedTarget = result.data;
        this.outputselectedTarget.emit(result.data)
      }
    });
  }

  openTarget(event: any){
    event.stopPropagation();
    if (this.selectedTarget) {
      window.open(environment.url + "/projects/" + this.project?.id + "/targets/" + this.selectedTarget.id + "/edit", "_blank");
    }
  }

  setProject(project: Project) {
    this.project = project;
  }

  setTarget(target: Target) {
    this.selectedTarget = target;
  }

  disableChoice(){
    this.disabled = true;
  }

  enableChoice(){
    this.disabled = false;
  }

}