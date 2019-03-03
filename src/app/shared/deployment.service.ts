import { Injectable } from "@angular/core";
import { LocationService } from "../shared/location.service";
import { environment } from "../../environments/environment";

@Injectable()
export class Deployment {
  mode: string = this.location.search()["mode"] || environment.mode;

  constructor(private location: LocationService) {}
}
