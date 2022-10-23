import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'adj-visit-deatil-grid',
  templateUrl: './visit-deatil-grid.component.html',
  styleUrls: ['./visit-deatil-grid.component.scss'],
})
export class VisitDeatilGridComponent implements OnInit {
  @Input() pageData;
	public expandOutlet: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public showOutlet() {
		this.expandOutlet = !this.expandOutlet;
	}

}
