import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router,
  private menu:MenuController) {
    this.currentUser = JSON.parse(localStorage.getItem('curentUser'));
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  logOut(){
    this.authService.logOut().subscribe(data => {
      this.currentUser = null;
      this.router.navigate(['login']);
    },err => {

    });
  }

}
