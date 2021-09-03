import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {WorkPackage} from "./work-package.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkPackageService {

  constructor(private http: HttpClient) { }

  getAllByProjectId(projectId: number): Observable<WorkPackage[]> {
    let params = { size: 10000, projectId: projectId };
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/workPackages/search/findAllByProjectId', {params: params});
  }

  getAllByProjectIdAndPageAndSize(projectId: number, page: number, size: number) {
    let params = {projectId: projectId, page: page, size: size, sort: 'subject'};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/workPackages/search/findAllByProject_Id', {params: params});
  }
}
