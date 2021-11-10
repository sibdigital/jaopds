import {jsonProperty, Serializable} from "ts-serializable";

export class Target extends Serializable{
  @jsonProperty(Number)
  id: number | null = null;

  @jsonProperty(Object)
  status: any = null;

  @jsonProperty(String, null)
  name: string | null = null;

  @jsonProperty(Object)
  targetType: any = null;

  @jsonProperty(String, null)
  unit: string | null = null;

  @jsonProperty(Number, null)
  basicValue: number | null = null;

  @jsonProperty(Number, null)
  planValue: number | null = null;

  @jsonProperty(String, null)
  comment: string | null = null;

  @jsonProperty(Object)
  project: any;

  @jsonProperty(String, null)
  createdAt: string | null = null;

  @jsonProperty(String, null)
  updatedAt: string | null = null;

  @jsonProperty(Boolean, null)
  isApprove: boolean | null = null;

  @jsonProperty(Number, null)
  parentId: number | null = null;

  @jsonProperty(Number, null)
  measureUnitId: number | null = null;

  @jsonProperty(Boolean, null)
  isAdditional: boolean | null = null;

  @jsonProperty(String, null)
  type: string | null = null;

  @jsonProperty(String, null)
  basicDate: string | null = null;

  @jsonProperty(String, null)
  planDate: string | null = null;

  @jsonProperty(String, null)
  nationalProjectGoal: string | null = null;

  @jsonProperty(String, null)
  nationalProjectResult: string | null = null;

  @jsonProperty(String, null)
  nationalProjectCharact: string | null = null;

  @jsonProperty(String, null)
  resultDueDate: string | null = null;

  @jsonProperty(Number, null)
  resultAssigned: number | null = null;

  @jsonProperty(Number, null)
  metaId: number | null = null;

}
