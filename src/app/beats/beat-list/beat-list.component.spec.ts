import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeatListComponent } from './beat-list.component';

describe('BeatListComponent', () => {
  let component: BeatListComponent;
  let fixture: ComponentFixture<BeatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
