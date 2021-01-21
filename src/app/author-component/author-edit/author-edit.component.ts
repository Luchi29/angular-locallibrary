import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorApiService } from './../../service/author-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';
import { Author } from './../../model/author';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  selectedAuthor: Author;
  submitted = false;
  editForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private authorApi: AuthorApiService,
    private router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.updateAuthor();
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getAuthor(id);
    this.editForm = this.fb.group({
      first_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      date_of_birth: [''],
      date_of_death: [''],
    });*/
  };

  get myForm() {
    return this.editForm.controls;
  }

  /*getAuthor(id) {
    this.authorApi.getAuthor(id).subscribe(data => {
      this.editForm.setValue({
        first_name: data['first_name'],
        family_name: data['family_name'],
        date_of_birth: (null===data['date_of_birth']) ? '' : moment(data['date_of_birth']).add(1, 'days').format('YYYY-MM-DD'),
        date_of_death: (null===data['date_of_death']) ? '' : moment(data['date_of_death']).add(1, 'days').format('YYYY-MM-DD')
      });
    });
  }*/

  updateAuthor() {
    this.editForm = this.fb.group({
      id: [this.selectedAuthor.id],
      first_name: [this.selectedAuthor.first_name, [Validators.required]],
      family_name: [this.selectedAuthor.family_name, [Validators.required]],
      date_of_birth: [(null===this.selectedAuthor.date_of_birth) ? '' : moment(this.selectedAuthor.date_of_birth ).add(1, 'days').format('YYYY-MM-DD')],
      date_of_death: [(null===this.selectedAuthor.date_of_death) ? '' : moment(this.selectedAuthor.date_of_death ).add(1, 'days').format('YYYY-MM-DD')],
    });
  };

  showSuccess() {
    this.toastService.show('Updated successfuly', {
      classname: 'bg-success text-white',
      delay: 2000 ,
      autohide: true
    });
  }

  onSubmit() {
    if(!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.authorApi.updateAuthor(this.editForm.value).subscribe(
      (res) => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccess();
      },
      (error) => {
        console.log(error);
      }
    )







    /*else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.authorApi.updateAuthor(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/authors');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          });
      };
    };*/
  };



}
