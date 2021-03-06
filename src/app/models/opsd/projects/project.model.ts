import {jsonProperty, Serializable} from "ts-serializable";
import "reflect-metadata";

export class Project extends Serializable {

  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(String)
  name: string = '';

  @jsonProperty(String)
  description: string = '';

  @jsonProperty(Boolean)
  public: boolean = true;

  @jsonProperty(Object)
  parent: any = null;

  @jsonProperty(String, null)
  createdOn: string | null = null;

  @jsonProperty(String, null)
  updatedOn: string | null = null;

  @jsonProperty(String, null)
  identifier: string | null = null;

  @jsonProperty(Number)
  status: number = 1;

  @jsonProperty(Number, null)
  lft: number | null = null;

  @jsonProperty(Number, null)
  rgt: number | null = null;

  @jsonProperty(Object)
  projectApproveStatus: any = null;

  @jsonProperty(Object)
  projectStatus: any = null;

  @jsonProperty(String, null)
  startDate: string | null = null;

  @jsonProperty(String, null)
  dueDate: string | null = null;

  @jsonProperty(Object)
  nationalProject: any = null;

  @jsonProperty(Object)
  federalProject: any = null;

  @jsonProperty(String, null)
  type: string | null = null;

  @jsonProperty(String, null)
  factStartDate: string | null = null;

  @jsonProperty(String, null)
  factDueDate: string | null = null;

  @jsonProperty(Number, null)
  investAmount: number | null = null;

  @jsonProperty(Boolean, null)
  program: boolean | null = null;

  @jsonProperty(Object)
  address: number | null = null;

  @jsonProperty(String, null)
  nationalProjectTarget: string | null = null;

  @jsonProperty(String, null)
  governmentProgram: string | null = null;

  @jsonProperty(String, null)
  missionOfHead: string | null = null;

}
