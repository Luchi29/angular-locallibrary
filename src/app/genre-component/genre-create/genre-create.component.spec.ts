import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCreateComponent } from './genre-create.component';

describe('GenreCreateComponent', () => {
  let component: GenreCreateComponent;
  let fixture: ComponentFixture<GenreCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
