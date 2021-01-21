import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinstanceEditComponent } from './bookinstance-edit.component';

describe('BookinstanceEditComponent', () => {
  let component: BookinstanceEditComponent;
  let fixture: ComponentFixture<BookinstanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinstanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinstanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
