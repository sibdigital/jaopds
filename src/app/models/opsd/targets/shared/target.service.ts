import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Target} from "../target.model";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private http: HttpClient) { }

  getAllByProjectId(projectId: number): Observable<Target[]> {
    let params = new HttpParams().set("projectId", projectId)
    return this.http.get<Target[]>(environment.jopsd_url + '/target_list', {params: params});
  }

  getAllByProjectIdAndNameAndIdIsNotInAndPageAndSizeAndSort(projectId: number, name: string, ids: any, page: number, size: number, sort: string, sortDir: string) {
    sortDir = (sortDir == '') ? 'asc' : sortDir;
    if (ids) {
      let params = {projectId, name, ids, page, size, sort: sort.concat(',', sortDir)};
      return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/targets/search/findByProject_IdAndNameContainingIgnoreCaseAndIdIsNotIn', {params: params});
    } else {
      let params = {projectId, name, page, size, sort: sort.concat(',', sortDir)};
      return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/targets/search/findByProject_IdAndNameContainingIgnoreCase', {params: params});
    }
  }

  changeTargetMetaId(target: Target, metaId: number | null) {
    return this.http.post(environment.jopsd_url + '/targets/metaId',
      {},
      {params: new HttpParams()
          .set("metaId", metaId ? metaId.toString() : '')
          .set("targetId", target.id ? target.id.toString() : '')
         });
  }
}
