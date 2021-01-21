import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinstanceListComponent } from './bookinstance-list.component';

describe('BookinstanceListComponent', () => {
  let component: BookinstanceListComponent;
  let fixture: ComponentFixture<BookinstanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinstanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
