import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getAllByNameAndIsApproveAndPageAndSizeAndSort(name: string, isApprove: boolean, page: number, size: number, sort: string, sortDir: string) {
    sortDir = (sortDir == '') ? 'asc' : sortDir;
    let params = {name: name, isApprove: isApprove, page: page, size: size, sort: sort.concat(',', sortDir)};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/organizations/search/findByNameContainingIgnoreCaseAndIsApprove', {params: params});
  }
}
