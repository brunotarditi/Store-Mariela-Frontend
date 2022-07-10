import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-bottom',
  templateUrl: './title-bottom.component.html',
  styleUrls: ['./title-bottom.component.scss']
})
export class TitleBottomComponent implements OnInit {
  @Input() developer = '';
  @Input() color: 'primary' | 'secondary' | 'warning';
  constructor() { }

  ngOnInit(): void {
  }

  goToWhatsapp(){
    window.open('https://api.whatsapp.com/send?phone=5492613378438&text=Hola me gustaría consultar por...', '_blank')
  }

  goToFacebook(){
    window.open('https://www.facebook.com/libreriamariela2', '_blank')
  }

}
