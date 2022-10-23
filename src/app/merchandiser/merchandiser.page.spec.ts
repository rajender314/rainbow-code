import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerchandiserPage } from './merchandiser.page';

describe('MerchandiserPage', () => {
  let component: MerchandiserPage;
  let fixture: ComponentFixture<MerchandiserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchandiserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
