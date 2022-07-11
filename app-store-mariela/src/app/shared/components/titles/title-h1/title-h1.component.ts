import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-h1',
  templateUrl: './title-h1.component.html',
  styleUrls: ['./title-h1.component.scss']
})
export class TitleH1Component implements OnInit {
  @Output() routerBack: EventEmitter<string>;
  @Input() text = '';
  @Input() color: 'primary' | 'secondary' | 'warning';
  constructor(private router: Router) {
    this.routerBack = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
