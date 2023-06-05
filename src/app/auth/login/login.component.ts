import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['javier@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    remember: [ false ]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {

  }


  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        console.log(resp);
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }  
  

}
