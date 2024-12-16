import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMatriculaComponent } from './lista-matricula.component';

describe('ListaMatriculaComponent', () => {
  let component: ListaMatriculaComponent;
  let fixture: ComponentFixture<ListaMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMatriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
