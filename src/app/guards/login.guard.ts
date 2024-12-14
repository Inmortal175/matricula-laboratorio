import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router)
  return authService.user$.pipe(
      take(1), // Tomamos solo el primer valor emitido
      map(user => {
          if (user) {
                router.navigate(['/home']); // Redirige a la página de home si está autenticado
                return false; // Bloquea el acceso si está autenticado
          } else {
                return true; // Permite el acceso si el usuario no está autenticado
          }
      })
  );
};