export class JavaResponseBody {
  status: string;
  cause: string;
  sname: string;


  constructor(status: string, cause: string, sname: string) {
    this.status = status;
    this.cause = cause;
    this.sname = sname;
  }
}
