import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { USUARIOS } from '../users';
import { User } from '../user';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';
import { FOTOS } from '../vendor/fotos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fotos: any;
  usuarios: any;
  descripcion: any;
  id: any;
  param: any;
  constructor(
    private ruta: ActivatedRoute, private users: UsersService, private auth: AuthenticationService
  ) {
    this.fotos =
      this.id = '';
    if (this.auth.isTokenValid) {
      this.id = this.auth.getUserID();
    }
    this.ruta.params.subscribe(params => {
      this.param = params.id;
      this.usuarios = this.users.getUser(params.id);
      this.descripcion = this.users.getVendors(this.param);
    });


  }

  ngOnInit() {
  }

  getUser(i) {
    //i = Math.trunc(i);
    // return this.Usuarios[i];
  }
  actualizarDatos() {
    // this.ii = Math.trunc(this.ii);
    // USUARIOS[this.ii] = this.usuarios; // Toca implementar servicios con la base de datos para actualizar los datos directamente
  }
}
