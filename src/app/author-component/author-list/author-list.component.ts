import { Component, OnInit } from '@angular/core';
import { AuthorApiService } from './../../service/author-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from './../../model/author';
import { AuthorEditComponent } from './../author-edit/author-edit.component';

import { ToastService } from '../../service/toast.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  Author:any = [];
  author: Author;

  constructor(
    private authorApi: AuthorApiService,
    public modalService: NgbModal,
    public toastService: ToastService
    ) {
    this.readAuthor();
  }

  ngOnInit(): void {
  }

  readAuthor() {
    this.authorApi.getAuthors().subscribe((data) => {
      this.Author = data;
      console.log(data);
    });
  };

  removeAuthor(author, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorApi.deleteAuthor(author.id).subscribe((data) => {
          this.Author.splice(index, 1);
          this.showDelete();
        });
      }
    })
  };

  showDelete() {
    this.toastService.show('deleted! successfuly ', {
      classname: 'bg-danger text-white',
      delay: 2000 ,
      autohide: true
    });
  }

  // update author modal
  editAuthor(author: Author) {
    const ref = this.modalService.open(AuthorEditComponent, { centered: true });
    ref.componentInstance.selectedAuthor = author;

    ref.result.then((yes) => {
      console.log('Yes Click')

      this.readAuthor();
    },
    (cancel) => {
      console.log('Cancel click')
    });
  };

}
