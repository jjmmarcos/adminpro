import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    password2: ['', Validators.required ],
    terminos: [ false, Validators.required ],
  });

  constructor( private fb: FormBuilder ) { }

  crearUsuario() { 
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.valid) {
      console.log('posteando formulario');
    } else {
      console.log('Formulario no es correcto');
    }
  }

  campoNoValido(campo: string): boolean {
    return (this.registerForm.get(campo).invalid && this.formSubmitted) 
      ? true
      : false
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

}
