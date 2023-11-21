import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, private authServ: UserAuthService){}

  ngOnInit(): void {
    
  }


  
  onContactRouter(){
    this.route.navigate(['home/contact']);
  }

  onTaskRouter(){
    this.route.navigate(['home/task']);
  }
  
  onClickLogout(){
    this.authServ.Logout();
  }
}
