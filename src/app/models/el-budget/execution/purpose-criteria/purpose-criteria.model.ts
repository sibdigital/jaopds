import {PurposeCriteriaMonthlyExecutions} from "./purpose-criteria-monthly-executions.model";
import {jsonProperty} from "ts-serializable";

export class PurposeCriteria {
  @jsonProperty(Number, null)
  purposeCriteriaMetaId: number | null = null;

  @jsonProperty(String)
  description: string = "";

  @jsonProperty(Number, null)
  executionConfirmingDocuments: any;

  @jsonProperty(Number, null)
  risks: any;

  @jsonProperty(PurposeCriteriaMonthlyExecutions, null)
  purposeCriteriaMonthlyExecutions: PurposeCriteriaMonthlyExecutions | null = null;

}
