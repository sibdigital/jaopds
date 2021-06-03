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
  is_public: boolean = true;

  @jsonProperty(Number, null)
  parent_id: number | null = null;

  @jsonProperty(String, null)
  created_on: string | null = null;

  @jsonProperty(String, null)
  updated_on: string | null = null;

  @jsonProperty(String, null)
  identifier: string | null = null;

  @jsonProperty(Number)
  status: number = 1;

  @jsonProperty(Number, null)
  lft: number | null = null;

  @jsonProperty(Number, null)
  rgt: number | null = null;

  @jsonProperty(Number, null)
  project_approve_status_id: number | null = null;

  @jsonProperty(Number, null)
  project_status_id: number | null = null;

  @jsonProperty(String, null)
  start_date: string | null = null;

  @jsonProperty(String, null)
  due_date: string | null = null;

  @jsonProperty(Number, null)
  national_project_id: number | null = null;

  @jsonProperty(Number, null)
  federal_project_id: number | null = null;

  @jsonProperty(String, null)
  type: string | null = null;

  @jsonProperty(String, null)
  fact_start_date: string | null = null;

  @jsonProperty(String, null)
  fact_due_date: string | null = null;

  @jsonProperty(Number, null)
  invest_amount: number | null = null;

  @jsonProperty(Boolean, null)
  is_program: boolean | null = null;

  @jsonProperty(Number, null)
  address_id: number | null = null;

  @jsonProperty(String, null)
  national_project_target: string | null = null;

  @jsonProperty(String, null)
  government_program: string | null = null;

  @jsonProperty(String, null)
  mission_of_head: string | null = null;
}
