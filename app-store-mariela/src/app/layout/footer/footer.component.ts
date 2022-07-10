import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  brandImage: string;
  text = 'Sitio desarrollado por Bruno Tarditi';
  constructor() {
    this.brandImage = 'assets/logo.png';
  }

  ngOnInit(): void {
  }

}
