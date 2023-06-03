import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    password: ['123456', Validators.required ],
    password2: ['1234567', Validators.required ],
    terminos: [ true, Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder ) { }

  crearUsuario() { 
    this.formSubmitted = true;
    console.log(this.registerForm);

    if(this.registerForm.valid) {
      console.log('posteando formulario');
    } else {
      console.log('Formulario no es correcto');
    }
  }

  campoNoValido(campo: string): boolean {
    return (this.registerForm.get(campo).invalid && this.formSubmitted) 
      ? true
      : false;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return ( (pass1 === pass2) && this.formSubmitted ) 
      ? true
      : false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }


}
