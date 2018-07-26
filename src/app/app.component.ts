import { Component } from '@angular/core';
import swal from 'sweetalert2';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fb: any;
  public fauth: any;
  title = 'app';
  show = false;
  msg = "";
  ngOnInit() {
    this.init();
  }

  init() {
    var config = {
      apiKey: "AIzaSyAPMIEgdIotEU4FkypwfYww4wrTRXwXWbs",
    authDomain: "personalwebsite-4cf90.firebaseapp.com",
    databaseURL: "https://personalwebsite-4cf90.firebaseio.com",
    projectId: "personalwebsite-4cf90",
    storageBucket: "personalwebsite-4cf90.appspot.com",
    messagingSenderId: "246698756686"
    };
    firebase.initializeApp(config);
    this.fb = firebase.database();
    this.fauth = firebase.auth();
    //console.log("firebase database initialized " + this.fb);
    //console.log("firebase auth initialized " + this.fauth);
    this.loginUser() ;

  }

  loginUser(): any {
     console.log("Login User");
      this.fauth.signInWithEmailAndPassword('test@test.com', 'test123');
  }


  feedback() {
    this.show = !this.show;

  }

  saveMsg() {
   // console.log(this.msg);

    this.show = !this.show;

    if(this.msg != null && this.msg != undefined){
      this.save() ;
    }
   
  }

  save(){

    let ref = this.fb.ref().child("Feedback");
    let key = ref.push().key;

    this.fb.ref('Feedback/' + key).set(this.msg);
    this.msg = "";

    swal({
      position: 'center-left',
      type: 'success',
      backdrop: false,
      title: 'Thank you !!',
      showConfirmButton: false,

      timer: 1500
    })
  }
}
