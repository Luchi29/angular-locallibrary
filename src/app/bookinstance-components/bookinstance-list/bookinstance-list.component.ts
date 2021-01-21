import { Component, OnInit } from '@angular/core';
import { BookinstanceApiService } from './../../service/bookinstance-api.service';
import { Bookinstance } from './../../model/bookinstance';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookinstanceEditComponent } from './../bookinstance-edit/bookinstance-edit.component';
import { ToastService } from './../../service/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookinstance-list',
  templateUrl: './bookinstance-list.component.html',
  styleUrls: ['./bookinstance-list.component.css']
})
export class BookinstanceListComponent implements OnInit {

  bookinstance: Bookinstance;
  BookInstance:any = [];

  constructor(
    public toastService: ToastService,
    public modalService: NgbModal,
    private BookInstanceApi: BookinstanceApiService) {

    this.readBookInstance();
  }

  ngOnInit(): void {
  }

  readBookInstance() {
    this.BookInstanceApi.getBookInstances().subscribe((data) => {
      this.BookInstance = data;
    });
  };


  //modal to update
  editBookInstance(bookInstance: Bookinstance) {

    const ref = this.modalService.open(BookinstanceEditComponent, { centered: true });
    ref.componentInstance.selectedBookInstance = bookInstance;

    ref.result.then((yes) => {
      console.log('Yes Click');

      this.readBookInstance();
    },
    (cancel) => {
      console.log('Cancel Click');
    });
  };

    //toast for deleted
    showDelete() {
      this.toastService.show('deleted! successfuly ', {
        classname: 'bg-danger text-white',
        delay: 2000,
        autohide: true,
      });
    }


  removeBookInstance(bookInstance, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.BookInstanceApi.deleteBookInstance(bookInstance.id).subscribe((data) => {
          this.BookInstance.splice(index, 1);
          this.showDelete();
        });
      }
    });
  }

}
