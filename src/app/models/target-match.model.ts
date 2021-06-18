import {jsonProperty, Serializable} from "ts-serializable";
import {PurposeCriteria} from "./el-budget/execution/purpose-criteria/purpose-criteria.model";
import {Target} from "./opsd/targets/target.model";

export class TargetMatch extends Serializable{

  @jsonProperty(PurposeCriteria, null)
  purposeCriteria: PurposeCriteria | null = null;

  @jsonProperty(Target, null)
  target: Target | null = null;

  @jsonProperty(Boolean)
  createNewTarget: boolean = false;

  @jsonProperty(String)
  newTargetName: String = "";

}
