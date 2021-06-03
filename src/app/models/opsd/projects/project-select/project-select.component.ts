import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Project} from "../project.model";
import {ProjectService} from "../project.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss']
})
export class ProjectSelectComponent implements OnInit {

  projects: Project[] | undefined;
  @Input() selectedProject: Project | undefined;
  @Output() outputSelectedProject = new EventEmitter<any>();

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projects = [];
  }

  onChange(newValue: Project) {
    this.selectedProject = newValue;
    this.outputSelectedProject.emit(newValue)
  }

  getAllProjectsAndSet() {
    this.projectService.getAll().subscribe(
      (data) => {
          let projectList: Project[] = [];
          data.forEach((item) => {
            projectList.push(Project.fromJSON(item));
          });

          this.projects = projectList;
      }
    );
  }

}
