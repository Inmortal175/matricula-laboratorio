import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, Auth  } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    router = inject(Router)
    user$ = new BehaviorSubject<any>(null); // Observable para el estado del usuario

    constructor(public auth: Auth) {
        this.auth.onAuthStateChanged(user => {
        this.user$.next(user); // Actualiza el estado del usuario
        });
    }

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
        const result = await signInWithPopup(this.auth, provider);
        const userEmail = result.user.email;

        // Validar el dominio del correo electrónico
        if (userEmail && userEmail.endsWith('27@unsch.edu.pe')) {
            this.showSuccessAlert();
            return result.user;
        } else {
            // Si el dominio no es válido, cerrar la sesión
            await this.auth.signOut();
            this.showErrorAlert('Dominio no permitido. Solo se permiten correos @unsch.edu.pe que sean de la escuela de sistemas');
            this.router.navigate(['/login'])
            throw new Error('Dominio no permitido. Solo se permiten correos @unsch.edu.pe');
        }
        } catch (error) {
        //   this.showErrorAlert('Error al iniciar sesión con Google');
        throw error;
        }
    }

    async logout() {
        await this.auth.signOut();
        this.user$.next(false); // Actualiza el estado de autenticación
        this.router.navigate(['/login'])
    }

    showSuccessAlert() {
        Swal.fire({
          title: 'Éxito!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          toast: true,
          showConfirmButton: false,
          timer: 3000
        });
      }
    
      showErrorAlert(errorMessage: string) {
        Swal.fire({
          title: 'Error!',
          text: errorMessage || 'Ocurrió un error al iniciar sesión.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
}
