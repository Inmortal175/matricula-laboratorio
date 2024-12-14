import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    constructor(){
        
    }
    authService = inject(AuthService); //injectamos el auth service
    router = inject(Router)
    async LogIn(){
      await this.authService.loginWithGoogle().then(
        (result) => {
          this.router.navigate(['/home'])
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }

    ngOnInit(): void {
        // Verifica si ya hay un usuario autenticado
        this.authService.user$.subscribe(user => {
            if (user) {
            this.router.navigate(['/home']); // Redirige a la página principal
            }
        });
    }
}
