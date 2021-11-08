import {jsonProperty, Serializable} from "ts-serializable";
import {Project} from "../projects/project.model";

export class Enumeration extends Serializable{
  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(String, null)
  name: string | null = null;

  @jsonProperty(Number, null)
  position: number | null = null;

  @jsonProperty(Boolean, null)
  isDefault: boolean | null = null;

  @jsonProperty(String, null)
  type: number | null = null;

  @jsonProperty(Boolean, null)
  active: boolean | null = null;

  @jsonProperty(Project)
  project: Project | null = null;

  @jsonProperty(Object)
  parent: any = null;

  @jsonProperty(String, null)
  createdAt: string | null = null;

  @jsonProperty(String, null)
  updatedAt: string | null = null;

  @jsonProperty(Object, null)
  color: any = null;

}
