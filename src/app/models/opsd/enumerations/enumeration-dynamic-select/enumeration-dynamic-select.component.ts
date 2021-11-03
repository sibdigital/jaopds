import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Enumeration} from "../enumeration.model";
import {BehaviorSubject, Observable} from "rxjs";
import {scan} from "rxjs/operators";
import {EnumerationService} from "../shared/enumeration.service";

@Component({
  selector: 'app-enumeration-dynamic-select',
  templateUrl: './enumeration-dynamic-select.component.html',
  styleUrls: ['./enumeration-dynamic-select.component.scss']
})
export class EnumerationDynamicSelectComponent implements OnInit {

  enumerations: Enumeration[] | undefined;
  @Input() loadOption: number = 0;
  @Input() enumerationLabel: string = 'Выберите тип';
  @Input() selectedEnumeration: Enumeration | undefined;
  @Output() outputSelectedEnumeration = new EventEmitter<any>();
  disabled: boolean = false;
  limit = 20;
  page = 0;
  options = new BehaviorSubject<Enumeration[]>([]);
  totalPage = 0;
  options$: Observable<Enumeration[]>;

  constructor(private enumerationService : EnumerationService) {
    this.options$ = this.options.asObservable().pipe(
      scan((acc:any, curr:any) => {
        return [...acc, ...curr];
      }, [])
    );
  }

  ngOnInit(): void {
    this.getNextBatch();
  }

  onChange(newValue: any) {
    this.selectedEnumeration = newValue;
    this.outputSelectedEnumeration.emit(newValue)
  }

  getNextBatch() {
    switch (this.loadOption) {
      default: {
        this.loadAllEnumerations();
        break;
      }
    }
  }

  loadAllEnumerations() {
    this.enumerationService.getAllByPageAndSize(this.page, this.limit, 'name', 'asc').subscribe(
      (data) => {
        let enumerationData: Object[] = data._embedded.enumerations;
        this.totalPage = data.page.totalPages;
        let enumerationList: Enumeration[] = [];
        enumerationData.forEach((item) => {
          enumerationList.push(Enumeration.fromJSON(item));
        });
        this.options.next(enumerationList);
        this.page += 1;
      })
  }


  setEnumeration(enumeration: Enumeration) {
    if (enumeration) {
      this.options = new BehaviorSubject<Enumeration[]>([enumeration]);
      this.options$ = this.options.asObservable().pipe(
        scan((acc:any, curr:any) => {
          return [...acc, ...curr];
        }, [])
      );
      this.selectedEnumeration = enumeration;
    }
  }

  disableSelect() {
    this.disabled = true;
  }

  enableSelect() {
    this.disabled = false;
  }
}
