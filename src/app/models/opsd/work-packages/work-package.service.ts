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
    let params = new HttpParams().set("projectId", projectId)
    return this.http.get<WorkPackage[]>(environment.java_app + '/work_package_list', {params: params});
  }
}
