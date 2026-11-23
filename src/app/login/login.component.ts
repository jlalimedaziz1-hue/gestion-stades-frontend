import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({selector:'app-login',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./login.component.html'})
export class LoginComponent { username='';password='';error='';loading=false;constructor(private auth:AuthService,private router:Router){} login():void{this.error='';this.loading=true;this.auth.login({username:this.username,password:this.password}).subscribe({next:()=>this.router.navigate(['/stades']),error:()=>{this.error='Nom d’utilisateur ou mot de passe incorrect.';this.loading=false;},complete:()=>this.loading=false});} }
