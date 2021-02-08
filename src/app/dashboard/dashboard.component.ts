import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { TYPE } from '../values.constants';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tabledataarray:any
  openModal=false;
  isEditable=false;
  deleteId:any;
  pageObj: any;
  currentpage = 1;


  detailsForm=new FormGroup({
    id:new FormControl(''),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    Id: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    gender: new FormControl('',Validators.required),
    grade: new FormControl('',Validators.required),
  }) 
  firstName: void;
  constructor(private service:ServiceService) { 
    this.tabledata()
  }

  ngOnInit(): void {
  }
  tabledata(){
    this.service.getallData().subscribe(res=>{
      console.log(res);
      this.tabledataarray=res;

    })
  }
  savedata(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false){
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 2000,
      title: 'Employee added Successfully'
    })
    console.log(this.detailsForm.value);
    this.service.postdata(this.detailsForm.value).subscribe(res=>{
      this.tabledata()
      this.detailsForm.reset()
      
    })
  }
  pagechange(page: number) {
    this.currentpage = page;
    this.tabledata();
  }
  moreAction(){
    this.isEditable=true
    this.openModal=!this.openModal;
  }
  showEditList(data:any){
    this.detailsForm.controls.id.setValue(data.id)
    this.detailsForm.controls.firstName.setValue(data.firstName)
    this.detailsForm.controls.lastName.setValue(data.lastName)
    this.detailsForm.controls.Id.setValue(data.Id)
    this.detailsForm.controls.gender.setValue(data.gender)
    this.detailsForm.controls.grade.setValue(data.grade)
     
  }
  deleteEmp(){
 this.service.idbaseddelete(this.deleteId).subscribe(res=>{
      this.tabledata()
    })
  }
  deletedata(id:any){
 this.deleteId=id
}
  updatedata(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false){
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 2000,
      title: 'Employee updated Successfully'
    })
    this.service.idbasedupdate(this.detailsForm.value).subscribe(res=>{
      this.tabledata();
      this.detailsForm.reset();
    })
  }
  get f(){
    return this.detailsForm.controls
   }
}
