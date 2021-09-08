import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Project} from "../project.model";
import {ProjectService} from "../shared/project.service";
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {scan} from "rxjs/operators";
import {WorkPackage} from "../../work-packages/work-package.model";

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
  limit = 20;
  page = 0;
  options = new BehaviorSubject<Project[]>([]);
  totalPage = 0;
  options$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.options$ = this.options.asObservable().pipe(
      scan((acc:any, curr:any) => {
        return [...acc, ...curr];
      }, [])
    );
  }

  ngOnInit(): void {
    this.getNextBatch();
  }

  onChange(newValue: Project) {
    this.selectedProject = newValue;
    this.outputSelectedProject.emit(newValue)
  }

  getNextBatch() {
    this.projectService.getAllByPageAndSize(this.page, this.limit, 'name').subscribe(
      (data) => {
        let projectData: Object[] = data._embedded.projects;
        this.totalPage = data.page.totalPages;
        let projectList: Project[] = [];
        projectData.forEach((item) => {
          projectList.push(Project.fromJSON(item));
        });
        this.options.next(projectList);
        this.page += 1;
      })
  }

  setProject(project: any) {
    if (project) {
      this.options = new BehaviorSubject<Project[]>([project]);
      this.options$ = this.options.asObservable().pipe(
        scan((acc:any, curr:any) => {
          return [...acc, ...curr];
        }, [])
      );
      this.selectedProject = project;
    }
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
