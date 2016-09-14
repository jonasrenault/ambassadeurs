import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Ambassadeur } from './ambassadeur';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AmbassadeursService {

  constructor(private http: Http) { }

  private ambassadeursUrl = 'app/ambassadeurs.json';  // URL to web api

  getAmbassadeurs(): Promise<Ambassadeur[]> {
    return this.http.get(this.ambassadeursUrl)
               .toPromise()
               .then(response => response.json() as Ambassadeur[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
