import {jsonProperty, Serializable} from "ts-serializable";
import "reflect-metadata";

export class WorkPackage extends Serializable {

  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(Number)
  type_id: number = 0;

  @jsonProperty(Number)
  project_id: number = 0;

  @jsonProperty(String)
  subject: string = "";

  @jsonProperty(String, null)
  description: string | null = null;

  @jsonProperty(String, null)
  due_date: string | null = null;

  @jsonProperty(Number, null)
  category_id: number | null = null;

  @jsonProperty(Number)
  status_id: number = 0;

  @jsonProperty(Number, null)
  assigned_to_id: number | null = null;

  @jsonProperty(Number, null)
  priority_id: number | null = null;

  @jsonProperty(Number, null)
  fixed_version_id: number | null = null;

  @jsonProperty(Number)
  author_id: number = 0;

  @jsonProperty(Number)
  lock_version: number = 0;

  @jsonProperty(Number)
  done_ratio: number = 0;

  @jsonProperty(Number, null)
  estimated_hours: number | null = null;

  @jsonProperty(String, null)
  created_at: string | null = null;

  @jsonProperty(String, null)
  updated_at: string | null = null;

  @jsonProperty(String, null)
  start_date: string | null = null;

  @jsonProperty(Number, null)
  responsible_id: number | null = null;

  @jsonProperty(Number, null)
  cost_object_id: number | null = null;

  @jsonProperty(Number, null)
  position: number | null = null;

  @jsonProperty(Number, null)
  story_points: number | null = null;

  @jsonProperty(Number, null)
  remaining_hours: number | null = null;

  @jsonProperty(String, null)
  plan_type: string | null = null;

  @jsonProperty(Number, null)
  contract_id: number | null = null;

  @jsonProperty(Boolean, null)
  result_agreed: boolean | null = null;

  @jsonProperty(Number, null)
  organization_id: number | null = null;

  @jsonProperty(String, null)
  sed_href: string | null = null;

  @jsonProperty(Number, null)
  arbitary_object_id: number | null = null;

  @jsonProperty(String, null)
  plan_num_pp: string | null = null;

  @jsonProperty(String, null)
  raion_id: number | null = null;

  @jsonProperty(Number, null)
  required_doc_type_id: number | null = null;

  @jsonProperty(String, null)
  fact_due_date: string | null = null;

  @jsonProperty(String, null)
  first_due_date: string | null = null;

  @jsonProperty(String, null)
  last_due_date: string | null = null;

  @jsonProperty(String, null)
  first_start_date: string | null = null;

  @jsonProperty(String, null)
  last_start_date: string | null = null;

  @jsonProperty(Number, null)
  period_id: number | null = null;

  @jsonProperty(Number, null)
  control_level_id: number | null = null;

  @jsonProperty(Number, null)
  outer_id: number | null = null;

}
