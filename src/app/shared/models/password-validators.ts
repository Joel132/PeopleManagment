import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('clave').value;
        if(AC.get('confirmarContraseña').touched || AC.get('confirmarContraseña').dirty) {
            let verifyPassword = AC.get('confirmarContraseña').value;

            if(password != verifyPassword) {
                AC.get('confirmarContraseña').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }
}