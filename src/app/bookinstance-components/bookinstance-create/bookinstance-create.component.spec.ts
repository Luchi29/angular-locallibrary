import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinstanceCreateComponent } from './bookinstance-create.component';

describe('BookinstanceCreateComponent', () => {
  let component: BookinstanceCreateComponent;
  let fixture: ComponentFixture<BookinstanceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinstanceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinstanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
