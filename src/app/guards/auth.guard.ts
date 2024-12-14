import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
    const authService = inject(AuthService); // Inyecta el servicio de autenticación
    const router = inject(Router)
    return authService.user$.pipe(
        take(1), // Tomamos solo el primer valor emitido
        map(user => {
            if (user) {
                return true; // Permite el acceso si el usuario está autenticado
            } else {
                router.navigate(['/login']); // Redirige a la página de login si no está autenticado
                return false; // Bloquea el acceso si no está autenticado
            }
        })
    );
};