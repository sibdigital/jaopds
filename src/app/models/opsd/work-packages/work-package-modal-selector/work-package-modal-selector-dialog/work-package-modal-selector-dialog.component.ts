import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Project} from "../../../projects/project.model";
import {merge, of as observableOf} from "rxjs";
import {WorkPackageService} from "../../shared/work-package.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {MatRow} from "@angular/material/table";
import {WorkPackage} from "../../work-package.model";

@Component({
  selector: 'app-work-package-modal-selector-dialog',
  templateUrl: './work-package-modal-selector-dialog.component.html',
  styleUrls: ['./work-package-modal-selector-dialog.component.scss']
})
export class WorkPackageModalSelectorDialogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'subject'];
  workPackages : WorkPackage[] = [];
  project: Project | undefined;
  keyWord : string = '';
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator)  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    public dialogRef: MatDialogRef<WorkPackageModalSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workPackageService: WorkPackageService
  ) {
    this.project = this.data.project;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.workPackageService.getAllByProjectIdAndNameAndPageAndSizeAndSort(
            this.project?.id!, this.keyWord, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data.page.number === data.page.totalPages;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          // this.resultsLength = data.page.totalPages;
          this.paginator.length = data.page.totalElements;
          return data._embedded.workPackages;
        })
      ).subscribe(data => {
      this.workPackages = data;
    });

  }

  keyWordChange(event: Event) {
    this.keyWord = (event.target as HTMLInputElement).value;
    this.paginator.pageIndex = 0;
    this.ngAfterViewInit();
  }

  selectWorkPackage(row: MatRow) {
    this.dialogRef.close({data: row});
  }
}
