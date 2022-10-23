import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeatsPage } from './beats.page';

describe('BeatsPage', () => {
  let component: BeatsPage;
  let fixture: ComponentFixture<BeatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
