import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../projects/project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EnumerationService} from "../../../enumerations/shared/enumeration.service";
import {Enumeration} from "../../../enumerations/enumeration.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Target} from "../../target.model";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {formatDate} from "@angular/common";
import {EnumerationSelectComponent} from "../../../enumerations/enumeration-select/enumeration-select.component";

@Component({
  selector: 'app-target-modal-creator-dialog',
  templateUrl: './target-modal-creator-dialog.component.html',
  styleUrls: ['./target-modal-creator-dialog.component.scss']
})
export class TargetModalCreatorDialogComponent implements OnInit {

  project: Project | null;
  targetType: Enumeration | undefined;
  targetName: string = '';
  targetTypeList: Enumeration[] = [];

  @ViewChild('enumerationSelectComponent') enumerationSelectComponent: EnumerationSelectComponent | undefined;

  constructor(
    public dialogRef: MatDialogRef<TargetModalCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enumerationService: EnumerationService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.project = this.data.project;
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('50%');
    this.enumerationService.getAllByActiveAndTypeAndNameIn(true, 'TargetType', ['Цель','Показатель','Результат']).subscribe(
      (data) => {
        this.targetTypeList = data._embedded.enumerations;
      }
    );
  }

  setName(event: any) {
    this.targetName = event.target.value;
  }

  createTarget(): void {

    let newTarget: Target = new Target();
    newTarget.id = null;
    newTarget.targetType = environment.jopsd_url + environment.jopsd_api + '/enumerations/' + this.enumerationSelectComponent?.selectedEnumeration?.id;
    newTarget.name = this.targetName;
    newTarget.parentId = 0;
    newTarget.project = environment.jopsd_url + environment.jopsd_api + '/projects/' + this.project?.id;
    newTarget.createdAt = formatDate(Date.now(), 'yyyy-MM-ddThh:mm:ss.SSSZ', 'en-EN');
    newTarget.updatedAt = formatDate(Date.now(), 'yyyy-MM-ddThh:mm:ss.SSSZ', 'en-EN');


    this.httpClient.post<Target>(environment.jopsd_url + environment.jopsd_api + '/targets', newTarget).subscribe(
      (data) => {
          const config = new MatSnackBarConfig();
          config.panelClass = ['background-green'];
          config.verticalPosition = "top";
          config.horizontalPosition = 'right';
          config.duration = 2000;
          this._snackBar.open("Показатель сохранен", 'Ок', config);
          this.dialogRef.close();
      },
      error => {
        const config = new MatSnackBarConfig();
        config.panelClass = ['background-red'];
        config.verticalPosition = "top";
        config.horizontalPosition = 'right';
        config.duration = 2000;
        this._snackBar.open("Не удалось сохранить", 'Х', config);
      }
    );
  }

  getOutputType(outputSelectedType: Enumeration) {
    this.targetType = outputSelectedType;
  }

}
