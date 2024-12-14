import { AfterViewInit, Component, ElementRef, inject, OnInit, Signal, viewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  authService = inject(AuthService); //onjectamos el servcio
  DisplayName = ""
  Perfil = ""
  correo = ""
  sidebar : Signal<ElementRef | undefined> = viewChild('sidebar');
  menubar : Signal<ElementRef | undefined> = viewChild('menubtn')
  canvasProfile: Signal<ElementRef | undefined> = viewChild('canvasElement')

  profileImage: string | null = null;

  ngOnInit(): void {
      const sidebar : ElementRef | undefined = this.sidebar()
      // if (sidebar){
      //   console.log(sidebar.nativeElement.classList.toggle('-translate-x-full'))
      // }
      
      this.authService.user$.subscribe((user) =>{
        this.DisplayName = user.displayName //seteamos el nombre
        this.correo = user.email
      })
      
  }

  ngAfterViewInit(): void {
    this.authService.user$.subscribe((user) =>{
        this.DisplayName = user.displayName
        this.createProfile(this.getInitials(user.displayName))
      })
  }

  createProfile(inicial : string){
    const canvasEl = this.canvasProfile()
    const canvas: HTMLCanvasElement = canvasEl?.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
        // Configuración del fondo
        context.fillStyle = this.getRandomDarkColor(); // Color de fondo
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Configuración del texto
        context.fillStyle = '#FFFFFF'; // Color del texto
        context.font = 'bold 22px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(inicial, canvas.width / 2, canvas.height / 2 + 2);

        // Exportar imagen
        this.profileImage = canvas.toDataURL('image/png');
    }
  }

  private getInitials(name: string): string {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    } else if (names.length === 1) {
      return names[0].charAt(0).toUpperCase(); // Si solo hay un nombre
    }
    return ''; // Si no hay nombre
  }

  // Función para generar un color oscuro aleatorio
  private getRandomDarkColor(): string {
    const r = Math.floor(Math.random() * 128); // Rango de rojo [0-127]
    const g = Math.floor(Math.random() * 128); // Rango de verde [0-127]
    const b = Math.floor(Math.random() * 128); // Rango de azul [0-127]
    return `rgb(${r}, ${g}, ${b})`; // Retorna el color en formato RGB
  }

  //LogOut
  LogOut(){
    this.authService.logout().then((value) =>{
        Swal.fire({
            title: 'Éxito!',
            text: 'Tu sesión a finalizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            toast: true,
            showConfirmButton: false,
            timer: 3500
          });

    })
  }
  openSidebar() {
    this.sidebar()?.nativeElement.classList.remove('-translate-x-full'); // Abre el sidebar
    this.sidebar()?.nativeElement.classList.add('translate-x-0'); // Muestra el sidebar
  }

  closeSidebar() {
    this.sidebar()?.nativeElement.classList.remove('translate-x-0'); // Cierra el sidebar
    this.sidebar()?.nativeElement.classList.add('-translate-x-full'); // Oculta el sidebar
  }
}
