import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListadorComponent } from './usuario-listador.component';

describe('UsuarioListadorComponent', () => {
  let component: UsuarioListadorComponent;
  let fixture: ComponentFixture<UsuarioListadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioListadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
