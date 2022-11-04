import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from "../../services/common.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data : any = [];
  showModal : boolean = false;
  formErrorMessage : boolean = false;
  errorMessage : string = '';
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    this.service.getUserDetail().subscribe((res) => {
      this.data = res;
    },
    () => {
      this.data = [];
    });
  }

  modalVal(val: boolean){
    this.showModal = val;
  }

  submitUser(userForm: any){
    if(this.userForm.valid){
      this.showModal = false;
      this.service.addUser(userForm.value).subscribe(res =>{
        this.getDetails();
      },
      () => {
        this.errorMessage = 'Something went wrong. Please refresh the page or try again later.';
      });
    }
    else {
      this.formErrorMessage = true;
    }
  }

  deleteUser(id:number){
    this.service.deleteUser(id).subscribe(res => {
      console.log('res',res);
    },
    () => {
      this.errorMessage = 'Something went wrong. Please refresh the page or try again later.';
    });
    this.getDetails();
  }

  redirectTo(id:number){
    this.router.navigate([`update/${id}`]);
    this.service.userId.next(id);
  }
}