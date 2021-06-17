import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Project} from "../project.model";
import {ProjectService} from "../project.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss']
})
export class ProjectSelectComponent implements OnInit {

  projects: Project[] | undefined;
  @Input() selectedProject: Project | undefined;
  @Output() outputSelectedProject = new EventEmitter<any>();
  disabled: boolean = false;

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

  getAllProjectsAndSetSelectedById(projectId: number) {
    this.projectService.getAll().toPromise().then(
        (data) => {
          let projectList: Project[] = [];
          data.forEach((item) => {
            projectList.push(Project.fromJSON(item));
          });

          this.projects = projectList;
          this.selectedProject = this.projects.find(item => item.id == projectId);
        }
    );
  }

  openProject(event: any){
    event.stopPropagation();
    if (this.selectedProject) {
      window.open(environment.url + "/projects/" + this.selectedProject?.identifier, "_blank");
    }
  }

  disableSelect() {
    this.disabled = true;
  }

  enableSelect() {
    this.disabled = false;
  }
}
