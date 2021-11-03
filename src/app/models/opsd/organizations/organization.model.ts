import {jsonProperty, Serializable} from "ts-serializable";

export class Organization extends Serializable{
  @jsonProperty(Number)
  id: number = 0;

  @jsonProperty(Object)
  parent: any = null;

  @jsonProperty(String, null)
  name: string | null = null;

  @jsonProperty(String, null)
  inn: string | null = null;

  @jsonProperty(Boolean, null)
  isLegalEntity: boolean | null = null;

  @jsonProperty(Number, null)
  orgType: number | null = null;

  @jsonProperty(String, null)
  createdAt: string | null = null;

  @jsonProperty(String, null)
  updatedAt: string | null = null;

  @jsonProperty(Boolean, null)
  isApprove: boolean | null = null;

  @jsonProperty(String, null)
  orgPravForma: string | null = null;

  @jsonProperty(String, null)
  urAddr: string | null = null;

  @jsonProperty(String, null)
  postAddr: string | null = null;

  @jsonProperty(String, null)
  otrasl: string | null = null;

  @jsonProperty(String, null)
  gorod: string | null = null;

  @jsonProperty(String, null)
  capital: string | null = null;

  @jsonProperty(String, null)
  phoneWrk: string | null = null;

  @jsonProperty(String, null)
  phoneWrkAdd: string | null = null;

  @jsonProperty(String, null)
  phoneMobile: string | null = null;

  @jsonProperty(String, null)
  mailAdd: string | null = null;

  @jsonProperty(String, null)
  address: string | null = null;

  @jsonProperty(String, null)
  cabinet: string | null = null;

}
