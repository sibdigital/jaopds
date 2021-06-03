import {PurposeCriteriaMonthlyExecution} from "./purpose-criteria-monthly-execution.model";
import {jsonProperty, Serializable} from "ts-serializable";

export class PurposeCriteriaMonthlyExecutions extends Serializable{
  @jsonProperty([PurposeCriteriaMonthlyExecution], null)
  purposeCriteriaMonthlyExecution: PurposeCriteriaMonthlyExecution[] | null = null;

}
