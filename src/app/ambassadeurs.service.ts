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

  drawChart(items: Ambassadeur[]): void {
    const byYear = items.reduce((res, item) => {
      res[item.year] = res[item.year] || {count: 0, particule: 0};
      res[item.year].count ++;
      const name = item.name.toLowerCase();
      if (name.indexOf('de ') !== -1 || name.indexOf("d' ") !== -1 || name.indexOf('du ') !== -1) {
        res[item.year].particule++;
      }
      return res;
    }, {});

    const trace = {
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter'
    };

    for (const year in byYear) {
      if (byYear.hasOwnProperty(year)) {
        trace.x.push(year);
        trace.y.push(byYear[year].particule * 100.0 / byYear[year].count);
      }
    }

    Plotly.newPlot('graphContainer', [trace]);

  }
}
