import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {LoadingController, MenuController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User;
  errorMessage:string;
  loader: any;
  isDismiss = false;

  constructor(private authService: AuthService, private router: Router,
  private loadingCtrl: LoadingController, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  login(){
    this.presentLoading();
    this.authService.login(this.user).subscribe(data=> {
      this.loader.dismiss();
      this.router.navigate(['/home']);

    },err => {
      this.errorMessage = "Username or password is incorrect";
      this.dismiss();
    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present().then(()=> {
      if(this.isDismiss){
        this.loader.dismiss();
      }
    });
  }

  async dismiss() {
   this.isDismiss = true;
   if(!this.loader){
     return;
   }
 return await this.loader.dismiss().then(() => console.log('dismissed'));
 }

}
