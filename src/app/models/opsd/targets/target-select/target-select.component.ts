import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from "../target.model";
import {Project} from "../../projects/project.model";
import {TargetService} from "../target.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.css']
})
export class TargetSelectComponent implements OnInit {

  @Input() targets: Target[] | undefined;
  @Input() selectedTarget: Target | undefined;
  @Output() outputSelectedTarget = new EventEmitter<any>();
  disabled: boolean = false;

  constructor(private targetService: TargetService) { }

  ngOnInit(): void {
  }

  fillAllByProject(project: Project) {
    if (project && project.id) {
      this.targetService.getAllByProjectId(project.id)
        .subscribe((data) => {
          let targetList : Target[] = [];
          data.forEach((item) => {
            targetList.push(Target.fromJSON(item));
          });
          this.targets = targetList;
        });
    }
  }

  onChange(newValue: Target) {
    this.selectedTarget = newValue;
    this.outputSelectedTarget.emit(newValue)
  }

  compareFn(c1: Target, c2: Target): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  disableSelect() {
    this.disabled = true;
  }

  enableSelect() {
    this.disabled = false;
  }

}
