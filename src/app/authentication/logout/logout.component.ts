
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logInService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.logInService.logout();
  }

  login() {
    this.router.navigate(['login']);
  }
}
