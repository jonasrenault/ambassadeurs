import { Component, OnInit } from '@angular/core';
import { AmbassadeursService } from '../ambassadeurs.service';
import { Ambassadeur } from '../ambassadeur';

@Component({
  selector: 'app-ambassadeurs',
  templateUrl: './ambassadeurs.component.html',
  styleUrls: ['./ambassadeurs.component.css']
})
export class AmbassadeursComponent implements OnInit {

  ambassadeurs: Ambassadeur[];

  constructor(private ambassadeursService: AmbassadeursService) { }

  ngOnInit() {
    this.getAmbassadeurs();
  }

  getAmbassadeurs(): void {
    this.ambassadeursService
        .getAmbassadeurs()
        .then(ambassadeurs => {
          this.ambassadeurs = ambassadeurs;
        });
  }

}
