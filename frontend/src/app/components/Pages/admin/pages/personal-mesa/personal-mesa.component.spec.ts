import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMesaComponent } from './personal-mesa.component';

describe('PersonalMesaComponent', () => {
  let component: PersonalMesaComponent;
  let fixture: ComponentFixture<PersonalMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
