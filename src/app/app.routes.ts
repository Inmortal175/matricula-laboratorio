import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { MatriculaComponent } from './pages/matricula/matricula.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        children:[
            {
                path: "",
                component: MatriculaComponent
            },
            // {
            //     path:"matriculados",
            // }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [loginGuard]
    },
];
