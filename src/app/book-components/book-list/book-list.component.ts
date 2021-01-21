import { Component, OnInit } from '@angular/core';
import { BookApiService } from './../../service/book-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from './../../model/book';
import { BookEditComponent } from './../../book-components/book-edit/book-edit.component';
import { ToastService } from './../../service/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  Book: any = [];
  book: Book;

  constructor(
    public toastService: ToastService,
    public modalService: NgbModal,
    private bookApi: BookApiService
  ) {
    this.readBook();
  }

  ngOnInit(): void {}

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Book = data;
    });
  }

  //update book modal
  editBook(book: Book) {
    const ref = this.modalService.open(BookEditComponent, { centered: true });
    ref.componentInstance.selectedBook = book;

    ref.result.then(
      (yes) => {
        console.log('Yes Click');

        this.readBook();
      },
      (cancel) => {
        console.log('Cancel Click');
      }
    );
  }
  //toast for deleted
  showDelete() {
    this.toastService.show('deleted! successfuly ', {
      classname: 'bg-danger text-white',
      delay: 2000,
      autohide: true,
    });
  }

  removeBook(book, index) {
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
        this.bookApi.deleteBook(book.id).subscribe((data) => {
          this.Book.splice(index, 1);
          this.showDelete();
        });
      }
    });
  }
}
