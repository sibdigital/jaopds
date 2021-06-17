import {jsonProperty, Serializable} from "ts-serializable";
import "reflect-metadata";

export class WorkPackage extends Serializable {

  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(Number)
  typeId: number = 0;

  @jsonProperty(Number)
  projectId: number = 0;

  @jsonProperty(String)
  subject: string = "";

  @jsonProperty(String, null)
  description: string | null = null;

  @jsonProperty(String, null)
  dueDate: string | null = null;

  @jsonProperty(Number, null)
  categoryId: number | null = null;

  @jsonProperty(Number)
  statusId: number = 0;

  @jsonProperty(Number, null)
  assignedToId: number | null = null;

  @jsonProperty(Number, null)
  priorityId: number | null = null;

  @jsonProperty(Number, null)
  fixedVersionId: number | null = null;

  @jsonProperty(Number)
  authorId: number = 0;

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

  @jsonProperty(Number, null)
  responsibleId: number | null = null;

  @jsonProperty(Number, null)
  costObjectId: number | null = null;

  @jsonProperty(Number, null)
  position: number | null = null;

  @jsonProperty(Number, null)
  storyPoints: number | null = null;

  @jsonProperty(Number, null)
  remainingHours: number | null = null;

  @jsonProperty(String, null)
  planType: string | null = null;

  @jsonProperty(Number, null)
  contractId: number | null = null;

  @jsonProperty(Boolean, null)
  resultAgreed: boolean | null = null;

  @jsonProperty(Number, null)
  organizationId: number | null = null;

  @jsonProperty(String, null)
  sedHref: string | null = null;

  @jsonProperty(Number, null)
  arbitaryObjectId: number | null = null;

  @jsonProperty(String, null)
  planNumPp: string | null = null;

  @jsonProperty(Number, null)
  raionId: number | null = null;

  @jsonProperty(Number, null)
  requiredDocTypeId: number | null = null;

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

  @jsonProperty(Number, null)
  periodId: number | null = null;

  @jsonProperty(Number, null)
  controlLevelId: number | null = null;

  @jsonProperty(Number, null)
  outerId: number | null = null;

  @jsonProperty(Number, null)
  metaId: number | null = null;

}
