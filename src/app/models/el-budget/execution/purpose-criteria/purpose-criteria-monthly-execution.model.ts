import {jsonProperty, Serializable} from "ts-serializable";

export class PurposeCriteriaMonthlyExecution extends Serializable{
  @jsonProperty(Number)
  month: number = 0;

  @jsonProperty(Number, null)
  factPrognos: number | null = null;

  @jsonProperty(Number, null)
  typeFact: number | null = null;
}
