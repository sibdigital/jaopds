import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExecutionUploaderComponent} from "./uploaders/el-budget/execution-uploader/execution-uploader.component";

const routes: Routes = [
  { path: 'upload/el_budget', component: ExecutionUploaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
