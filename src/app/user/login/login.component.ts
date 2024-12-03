import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { AlertComponent } from '../../shared/alert/alert.component'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, AlertComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	auth = inject(Auth)
	showAlert = signal(false)
	alertMsg = signal('Please wait we are logging you in')
	alertColor = signal('blue')
	inSubmission = signal(false)
	credentials = {
		email: '',
		password: ''
	}

	async login() {
		this.showAlert.set(true)
		this.alertMsg = signal('Please wait we are logging you in')
		this.alertColor = signal('blue')
		this.inSubmission.set(true)

		try {
			await signInWithEmailAndPassword(
				this.auth,
				this.credentials.email,
				this.credentials.password
			)
		} catch (e) {
			this.inSubmission.set(false)
			this.alertColor.set('red')
			this.alertMsg.set(
				'An unexpected error occured! Please try again later'
			)

			return
		}

		this.alertColor.set('green')
		this.alertMsg.set('Successful Login')
	}
}
