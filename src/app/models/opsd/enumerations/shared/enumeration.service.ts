import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnumerationService {

  constructor(private http: HttpClient) { }


  getAllByActiveAndTypeAndNameIn(active: boolean, type: string, names: string[]) {
    let params = {active: active, type: type, names: names};
    return this.http.get<any>(environment.jopsd_url + '/api/enumerations/search/findAllByActiveAndTypeAndNameIn', {params: params});
  }

  getAllByPageAndSize(page: number, size: number, sort: string, sortDir: string) {
    sortDir = (sortDir == '') ? 'asc' : sortDir;
    let params = {page: page, size: size, sort: sort.concat(',', sortDir)};
    return this.http.get<any>(environment.jopsd_url + 'api/enumerations', {params: params});
  }
}
