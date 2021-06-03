import {PurposeCriteria} from "./purpose-criteria.model";
import {jsonProperty, Serializable} from "ts-serializable";

export class PurposeCriterias extends Serializable{
  @jsonProperty([PurposeCriteria], null)
  purposeCriteria: PurposeCriteria[] | null = null;
}
