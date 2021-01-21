import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookinstanceApiService } from './../../service/bookinstance-api.service';
import { BookApiService } from './../../service/book-api.service';

@Component({
  selector: 'app-bookinstance-create',
  templateUrl: './bookinstance-create.component.html',
  styleUrls: ['./bookinstance-create.component.css'],
})
export class BookinstanceCreateComponent implements OnInit {
  submitted = false;
  bookInstanceForm: FormGroup;
  Book: any = [];
  status:any = ['Available', 'Maintenance', 'Loaned', 'Reserved'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private bookInstanceApi: BookinstanceApiService,
    private bookApi: BookApiService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.readBook();
    this.bookInstanceForm = this.fb.group({
      book: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
      status: ['', [Validators.required]],
      due_back: [],
    });
  }

  updateProfile(e){
    this.bookInstanceForm.get('status').setValue(e, {
      onlySelf: true
    })
  }

  //getter to access form control
  get myForm() {
    return this.bookInstanceForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.bookInstanceForm.valid) {
      return false;
    } else {
      this.bookInstanceApi
        .createBookInstance(this.bookInstanceForm.value)
        .subscribe(
          (res) => {
            console.log('Bookinstance successfully created!');
            this.ngZone.run(() => this.router.navigateByUrl('/bookinstances'));
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Book = data;
    })
  }
}
