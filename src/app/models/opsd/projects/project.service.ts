import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllByPageAndSize(page: number, size: number) {
    let params = {page: page, size: size, sort: 'name'};
    return this.http.get<any>(environment.jopsd_url + environment.jopsd_api + '/projects', {params: params});
  }

}
