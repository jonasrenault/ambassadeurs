import { Component, OnInit } from '@angular/core';
import { AmbassadeursService } from '../ambassadeurs.service';
import { Ambassadeur } from '../ambassadeur';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-ambassadeurs',
  templateUrl: './ambassadeurs.component.html',
  styleUrls: ['./ambassadeurs.component.css']
})
export class AmbassadeursComponent implements OnInit {

  ambassadeurs: Ambassadeur[];
  filteredAmbassadeurs: Ambassadeur[];
  filter: Ambassadeur = {name: '', country: '', year:null};
  nameControl = new FormControl();
  countryControl = new FormControl();
  yearControl = new FormControl();

  constructor(private ambassadeursService: AmbassadeursService) { }

  ngOnInit() {
    this.getAmbassadeurs();
    this.countryControl.valueChanges.debounceTime(300).subscribe(newValue => {
      this.filter.country = newValue;
      this.doFilter();
    });
    this.yearControl.valueChanges.debounceTime(300).subscribe(newValue => {
      this.filter.year = newValue;
      this.doFilter();
    });
    this.nameControl.valueChanges.debounceTime(300).subscribe(newValue => {
      this.filter.name = newValue;
      this.doFilter()
    });
  }

  getAmbassadeurs(): void {
    this.ambassadeursService
        .getAmbassadeurs()
        .then(ambassadeurs => {
          this.ambassadeurs = ambassadeurs;
          this.doFilter();
        });
  }

  doFilter(): void {
    console.log('filtering');
    const nameFilter = this.filter.name ? this.filter.name.toLowerCase() : null;
    const countryFilter = this.filter.country ? this.filter.country.toLowerCase() : null;
    this.filteredAmbassadeurs = this.ambassadeurs.filter(element => {
      return (!nameFilter || element.name.toLowerCase().indexOf(nameFilter) !== -1) && (!countryFilter || element.country.toLowerCase().indexOf(countryFilter) !== -1) && (!this.filter.year || element.year === this.filter.year);
    });
    this.ambassadeursService.drawChart(this.filteredAmbassadeurs);
  }

}
