import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


submitted=false
  constructor(private router:Router,private fb:FormBuilder) { }

  get f(){
     return this.form.controls
    }

form=this.fb.group({
  uname:['',Validators.required],
  pwd:['',Validators.required]
})

login(){
this.submitted=true
if(this.form.invalid){
return
}else{
  if(this.form.controls['uname'].value=='admin@persistent.com' && this.form.controls['pwd'].value=='BookingAdmin'){
localStorage.setItem('user',this.form.value.uname)
this.router.navigate(['dashboard'])
  }else{
    alert('Email id & password are incorrect')
    this.form.reset()
    this.submitted=false
}
}
}
}
