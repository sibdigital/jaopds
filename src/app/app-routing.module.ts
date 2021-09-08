import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExecutionUploaderComponent} from "./uploaders/el-budget/execution-uploader/execution-uploader.component";
import {MppUploaderComponent} from "./uploaders/mpp/mpp-uploader/mpp-uploader.component";

const routes: Routes = [
  { path: 'upload/el_budget', component: ExecutionUploaderComponent},
  { path: 'upload/mpp', component: MppUploaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
