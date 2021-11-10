import {jsonProperty, Serializable} from "ts-serializable";
import {PurposeCriteria} from "./el-budget/execution/purpose-criteria/purpose-criteria.model";
import {Target} from "./opsd/targets/target.model";
import {Project} from "./opsd/projects/project.model";

export class TargetMatch extends Serializable{

  @jsonProperty(PurposeCriteria, null)
  purposeCriteria: PurposeCriteria | null = null;

  @jsonProperty(Target, null)
  target: Target | null = null;

  @jsonProperty(Object, undefined)
  project: Project | undefined = undefined;

  @jsonProperty(Boolean)
  attachedTarget: boolean = false;

  @jsonProperty(Boolean)
  disableTargetChoice: boolean = false;

}
