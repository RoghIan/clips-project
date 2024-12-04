import { inject, Injectable } from '@angular/core'
import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth'
import {
	AbstractControl,
	AsyncValidator,
	ValidationErrors,
	ValidatorFn
} from '@angular/forms'
import { Observable } from 'rxjs'

export function Match(
	controlName: string,
	matchingControlName: string
): ValidatorFn {
	return (group: AbstractControl): ValidationErrors | null => {
		const control = group.get(controlName)
		const matchingControl = group.get(matchingControlName)

		if (!control || !matchingControl) {
			console.error('Form controls cannot be found in the form group.')
			return { controlNotFound: false }
		}

		const error =
			control.value === matchingControl.value ? null : { noMatch: true }

		matchingControl.setErrors(error)

		return error
	}
}

@Injectable({ providedIn: 'root' })
export class EmailTaken implements AsyncValidator {
	validate = (
		control: AbstractControl
	):
		| Promise<ValidationErrors | null>
		| Observable<ValidationErrors | null> => {
		return fetchSignInMethodsForEmail(this.auth, control.value).then(
			response => (response.length ? { emailTaken: true } : null)
		)
	}
	registerOnValidatorChange?(fn: () => void): void {
		throw new Error('Method not implemented.')
	}
	auth = inject(Auth)
}
