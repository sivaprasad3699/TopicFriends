import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {
  lastUpdate: string = "1 de Marzo de 2018";

  constructor() { }

  ngOnInit() {
  }

}
