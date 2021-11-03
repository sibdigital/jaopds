import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkPackage} from "../../../../models/opsd/work-packages/work-package.model";
import {JavaResponseBody} from "../../../../models/java-response-body.model";
import {PurposeCriteria} from "../../../../models/el-budget/execution/purpose-criteria/purpose-criteria.model";
import {Target} from "../../../../models/opsd/targets/target.model";
import {environment} from "../../../../../environments/environment";
import {TargetMatch} from "../../../../models/target-match.model";
import {CostObject} from "../../../../models/opsd/cost-objects/cost-object.model";
import {Organization} from "../../../../models/opsd/organizations/organization.model";

// class TargetMatch {
//   purposeCriteria: PurposeCriteria;
//   target: Target | undefined;
//   createNewTarget: boolean = true;
//
//   constructor(purposeCriteria: PurposeCriteria, target: Target | undefined) {
//     this.purposeCriteria  = purposeCriteria,
//     this.target = target;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class ExecutionUploaderService {

  constructor(private http: HttpClient) { }

  findWorkPackage(file: File): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    let data: FormData = new FormData();
    data.append('file', file, file.name);
    return this.http.post<any>(environment.jopsd_url + '/import/execution/find_work_package', data, {headers: headers});
  }

  putMetaIdAndOrganizationToWorkPackage(file: File, workPackageId: number, organization: Organization|undefined): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let data: FormData = new FormData();
    data.append('file', file, file.name);
    let organizationId = (organization) ? organization.id : '';
    let params = new HttpParams()
      .set("workPackageId", workPackageId)
      .set("organizationId", organizationId);

    return this.http.post<any>(environment.jopsd_url + '/import/execution/put_metaid_and_organization_to_work_package', data, {headers: headers, params: params});
  }

  createWorkPackage(file: File, workPackageName: string, projectId: number | undefined, projectName: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let data: FormData = new FormData();
    data.append('file', file, file.name);
    let params = new HttpParams()
      .set("workPackageName", workPackageName)
      .set("projectId", (projectId == undefined) ? 0 : projectId)
      .set("projectName", projectName);

    return this.http.post<any>(environment.jopsd_url + '/import/execution/create_work_package', data, {headers: headers, params: params});
  }

  processFinance(file: File, workPackage: WorkPackage): Observable<CostObject> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    let data: FormData = new FormData();
    data.append('file', file, file.name);
    let params = new HttpParams().set("workPackageId", workPackage.id);
    return this.http.post<CostObject>(environment.jopsd_url + '/import/execution/save_finance', data, {headers: headers, params: params});
  }

  processPurposeCriteria(file: File, workPackage: WorkPackage): Observable<TargetMatch[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    let data: FormData = new FormData();
    data.append('file', file, file.name);
    // let params = new HttpParams().set("workPackageId", workPackage.id);
    return this.http.post<TargetMatch[]>(environment.jopsd_url + '/import/execution/match_purpose_criteria', data, {headers: headers});
  }

  processTargets(targetMatches: TargetMatch[], workPackage: WorkPackage): Observable<TargetMatch[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("workPackageId", workPackage.id);

    return this.http.post<TargetMatch[]>(environment.jopsd_url + '/import/execution/process_targets', targetMatches, {headers: headers, params: params});
  }
}
