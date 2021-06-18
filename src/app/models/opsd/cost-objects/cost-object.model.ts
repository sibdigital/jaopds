import {jsonProperty, Serializable} from "ts-serializable";
import "reflect-metadata";

export class CostObject extends Serializable {
  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(Number)
  projectId: number = 0;

  @jsonProperty(Number)
  authorId: number = 0;

  @jsonProperty(String)
  subject: string = "";

  @jsonProperty(String)
  description: string = "";

  @jsonProperty(String)
  type: string = "";

  @jsonProperty(String)
  fixedDate: string = "";

  @jsonProperty(String)
  createdOn: string = "";

  @jsonProperty(String)
  updatedOn: string = "";

  @jsonProperty(Number)
  targetId: number = 0;

  @jsonProperty(Number)
  metaId: number = 0;
}
