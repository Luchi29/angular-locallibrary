import { Component, OnInit } from '@angular/core';
import { Bookinstance } from './../../model/bookinstance';
import { ActivatedRoute, Router } from "@angular/router";
import { BookinstanceApiService } from './../../service/bookinstance-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookApiService } from 'src/app/service/book-api.service';
import * as moment from 'moment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './../../service/toast.service';

@Component({
  selector: 'app-bookinstance-edit',
  templateUrl: './bookinstance-edit.component.html',
  styleUrls: ['./bookinstance-edit.component.css']
})
export class BookinstanceEditComponent implements OnInit {

  selectedBookInstance: Bookinstance;
  submitted = false;
  editForm: FormGroup;
  Book: any = [];
  status:any = ['Available', 'Maintenance', 'Loaned', 'Reserved'];

  constructor(
    public modal: NgbActiveModal,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private bookInstanceApi: BookinstanceApiService,
    private bookApi: BookApiService,
    private router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.updateBookInstance();
    this.readBook();
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBookInstance(id);
    this.editForm = this.fb.group({
      book: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
      status: ['', [Validators.required]],
      due_back: ['', [Validators.required]],
    });*/

  }

  //getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*getBookInstance(id) {
    this.bookInstanceApi.getBookinstance(id).subscribe(
      data => {
        console.log(data);
        this.editForm.setValue({
          book: data.book['id'],
          imprint: data['imprint'],
          status: data['status'],
          due_back: moment(data['due_back']).add(1, 'days').format('YYYY-MM-DD')
        });
      }
    );
  }*/

  updateBookInstance() {
    console.log(this.selectedBookInstance);
    this.editForm = this.fb.group({
      id: [this.selectedBookInstance.id],
      book: [this.selectedBookInstance.book.id, [Validators.required]],
      imprint: [this.selectedBookInstance.imprint, [Validators.required]],
      status: [this.selectedBookInstance.status, [Validators.required]],
      due_back: [moment(this.selectedBookInstance.due_back ['due_back']).add(1, 'days').format('YYYY-MM-DD')],
    });
  };

    //toast for update
    showSuccess() {
      this.toastService.show('Updated successfuly', {
        classname: 'bg-success text-white',
        delay: 2000 ,
        autohide: true
      });
    }

  onSubmit() {
    /*this.submitted = true;*/
    if (!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.bookInstanceApi.updateBookInstance(this.editForm.value).subscribe(
      (res) => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccess();
      },
      (error) => {
        console.log(error);
      });




    /*else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.bookInstanceApi.updateBookInstance(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/bookinstances');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          });
      };
    };*/
  };

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Book = data;
    })
  }

}
