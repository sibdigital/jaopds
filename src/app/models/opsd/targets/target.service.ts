import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Target} from "./target.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private http: HttpClient) { }

  getAllByProjectId(projectId: number): Observable<Target[]> {
    let params = new HttpParams().set("projectId", projectId)
    return this.http.get<Target[]>(environment.jopsd_url + '/target_list', {params: params});
  }

  getAllByProjectIdAndNameAndPageAndSizeAndSort(projectId: number, name: string, page: number, size: number, sort: string, sortDir: string) {
    sortDir = (sortDir == '') ? 'asc' : sortDir;
    let params = {projectId: projectId, name: name, page: page, size: size, sort: sort.concat(',', sortDir)};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/targets/search/findByProject_IdAndNameContainingIgnoreCase', {params: params});
  }
}
