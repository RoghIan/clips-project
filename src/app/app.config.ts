import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideFirebaseApp(() =>
			initializeApp({
				apiKey: 'AIzaSyDtHPhkUrbQg7jlpm8FgCvOAoR67ChU3Xc',
				authDomain: 'clips-eb39a.firebaseapp.com',
				projectId: 'clips-eb39a',
				storageBucket: 'clips-eb39a.firebasestorage.app',
				messagingSenderId: '442791015187',
				appId: '1:442791015187:web:3208902078b256e01da0e6'
			})
		),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore())
	]
}
