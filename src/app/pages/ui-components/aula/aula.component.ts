import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
})
export class AulaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
