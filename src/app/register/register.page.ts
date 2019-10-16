import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {MenuController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  errorMessage: string;
  loader: any;

  constructor(private authService: AuthService, private router: Router,
  private menu: MenuController, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  register(){
    this.presentLoading();
    this.authService.register(this.user).subscribe(data=> {
    this.loader.dismiss();
    this.router.navigate(['/login']);
    },err => {
      this.errorMessage = "Username already exists";
      this.loader.dismiss();
    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present();
  }

}
