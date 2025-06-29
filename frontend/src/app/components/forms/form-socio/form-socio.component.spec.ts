import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSocioComponent } from './form-socio.component';

describe('FormSocioComponent', () => {
  let component: FormSocioComponent;
  let fixture: ComponentFixture<FormSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
