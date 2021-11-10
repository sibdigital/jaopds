import {jsonProperty, Serializable} from "ts-serializable";
import "reflect-metadata";
import {Project} from "../projects/project.model";

export class WorkPackage extends Serializable {

  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(Object)
  type: any = null;

  @jsonProperty(Object)
  project: Project | undefined = undefined;

  @jsonProperty(String)
  subject: string = "";

  @jsonProperty(String, null)
  description: string | null = null;

  @jsonProperty(String, null)
  dueDate: string | null = null;

  @jsonProperty(Object)
  category: any = null;

  @jsonProperty(Object)
  status: any = null;

  @jsonProperty(Object)
  assignedTo: any = null;

  @jsonProperty(Object)
  priority: any = null;

  @jsonProperty(Object)
  fixedVersion: any = null;

  @jsonProperty(Object)
  author: any = null;

  @jsonProperty(Number)
  lockVersion: number = 0;

  @jsonProperty(Number)
  doneRatio: number = 0;

  @jsonProperty(Number, null)
  estimatedHours: number | null = null;

  @jsonProperty(String, null)
  createdAt: string | null = null;

  @jsonProperty(String, null)
  updatedAt: string | null = null;

  @jsonProperty(String, null)
  startDate: string | null = null;

  @jsonProperty(Object)
  responsible: any = null;

  @jsonProperty(Object)
  costObject: any = null;

  @jsonProperty(Number, null)
  position: any = null;

  @jsonProperty(Number, null)
  storyPoints: number | null = null;

  @jsonProperty(Number, null)
  remainingHours: number | null = null;

  @jsonProperty(String, null)
  planType: string | null = null;

  @jsonProperty(Number, null)
  contract: any = null;

  @jsonProperty(Boolean, null)
  resultAgreed: boolean | null = null;

  @jsonProperty(Object)
  organization: any = null;

  @jsonProperty(String, null)
  sedHref: string | null = null;

  @jsonProperty(Object)
  arbitaryObject: any = null;

  @jsonProperty(String, null)
  planNumPp: string | null = null;

  @jsonProperty(Object)
  raion: any = null;

  @jsonProperty(Object)
  requiredDocType: any = null;

  @jsonProperty(String, null)
  factDueDate: string | null = null;

  @jsonProperty(String, null)
  firstDueDate: string | null = null;

  @jsonProperty(String, null)
  lastDueDate: string | null = null;

  @jsonProperty(String, null)
  firstStartDate: string | null = null;

  @jsonProperty(String, null)
  lastStartDate: string | null = null;

  @jsonProperty(Object)
  period: any = null;

  @jsonProperty(Object)
  controlLevel: any = null;

  @jsonProperty(Number, null)
  outerId: number | null = null;

  @jsonProperty(Number, null)
  metaId: number | null = null;

}
