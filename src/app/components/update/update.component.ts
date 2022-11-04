import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  selectedUser: any;
  userId: any;
  errorMessage : any;
  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  constructor(
    private service: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.userId.subscribe(id => {
      this.userId = id;
    })
    this.getUserDetails();
  }

  getUserDetails() {
    this.service.getUserDetail(this.userId).subscribe((res) => {
      this.updateForm.patchValue({
        id: res.id,
        name: res.userName,
        project: res.project,
        status: res.status,
      });
    });
  }

  resetForm() {
    this.updateForm.reset();
  }

  redirectTo(){
    this.router.navigate(['dashboard']);
  }

  submit(updateForm: any) {
    this.service.updateUser(updateForm.value, this.userId).subscribe((res) => {
      this.router.navigate(['dashboard']);
    }, () => {
      this.errorMessage = 'Something went wrong. Please refresh the page or try again later.';
    });
  }
}
