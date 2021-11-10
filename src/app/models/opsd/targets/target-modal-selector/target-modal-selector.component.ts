import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../projects/project.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../../environments/environment";
import {Target} from "../target.model";
import {TargetModalSelectorDialogComponent} from "./target-modal-selector-dialog/target-modal-selector-dialog.component";

@Component({
  selector: 'app-target-modal-selector',
  templateUrl: './target-modal-selector.component.html',
  styleUrls: ['./target-modal-selector.component.scss']
})
export class TargetModalSelectorComponent implements OnInit {

  @Input() selectedTarget: Target | undefined;
  @Output() outputselectedTarget = new EventEmitter<any>();
  @Input() project: Project | undefined;
  @Input() excludedTargets: Target[] = [];
  @Input() disabled: boolean = false;
  @Input() hiddenLabel: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  chooseTarget(): void{
    let matDialogConfig: MatDialogConfig = {
      panelClass: "dialog-responsive",
      data: {
        project: this.project,
        excludedTargets: this.excludedTargets
      },
      autoFocus: false
    }
    const dialogRef = this.dialog.open(TargetModalSelectorDialogComponent, matDialogConfig);

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

  removeTarget(event: any) {
    if (this.selectedTarget != undefined) {
      const index = this.excludedTargets.indexOf(this.selectedTarget, 0);
      if (index > -1) {
        this.excludedTargets.splice(index, 1);
      }
      this.selectedTarget = undefined;
      this.outputselectedTarget.emit(null);
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
