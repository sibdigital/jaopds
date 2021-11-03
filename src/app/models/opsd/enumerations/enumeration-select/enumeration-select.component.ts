import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Enumeration} from "../enumeration.model";


@Component({
  selector: 'app-enumeration-select',
  templateUrl: './enumeration-select.component.html',
  styleUrls: ['./enumeration-select.component.scss']
})
export class EnumerationSelectComponent implements OnInit {
  @Input() enumerations: Enumeration[] | undefined;
  @Input() enumerationLabel: string = 'Выберите тип';
  @Input() selectedEnumeration: Enumeration | undefined;
  @Output() outputSelectedEnumeration = new EventEmitter<any>();
  disabled: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.selectedEnumeration);
    console.log(this.enumerations);
  }

  onChange(newValue: any) {
    this.selectedEnumeration = newValue;
    this.outputSelectedEnumeration.emit(newValue);
  }


  disableSelect() {
    this.disabled = true;
  }

  enableSelect() {
    this.disabled = false;
  }

}
