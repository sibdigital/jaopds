import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllByPageAndSize(page: number, size: number, sort: string) {
    let params = {page: page, size: size, sort: sort};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/projects', {params: params});
  }

  getAllByNameAndPageAndSizeAndSort(name: string, page: number, size: number, sort: string, sortDir: string) {
    let params = {name: name, page: page, size: size, sort: sort, [`${name}` + '.dir']: sortDir};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/projects/search/findByNameContainingIgnoreCase', {params: params});
  }
}
