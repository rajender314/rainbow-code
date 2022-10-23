import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KPICardComponent } from './kpicard.component';

describe('KPICardComponent', () => {
  let component: KPICardComponent;
  let fixture: ComponentFixture<KPICardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KPICardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KPICardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
