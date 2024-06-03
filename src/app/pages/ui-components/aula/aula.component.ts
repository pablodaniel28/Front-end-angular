import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [],
  templateUrl: './aula.component.html',
  styleUrl: './aula.component.scss'

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
