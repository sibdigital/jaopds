import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object[]> {
    return this.http.get<Object[]>(environment.backend_path + '/project_list');
  }

}
