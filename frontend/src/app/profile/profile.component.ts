import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USUARIOS } from '../users';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuarios: User;
  Usuarios = USUARIOS;
  ii: any;
  constructor(
    private ruta: ActivatedRoute
  ) {
    this.ruta.params.subscribe(params => {
      console.log(params.id);
      this.ii = (params.id);
      this.usuarios = this.getUser(params.id);
    });
  }

  ngOnInit() {
  }

  getUser(i) {
    i = Math.trunc(i);
    return this.Usuarios[i];
  }
  actualizarDatos() {
    this.ii = Math.trunc(this.ii);
    USUARIOS[this.ii] = this.usuarios; // Toca implementar servicios con la base de datos para actualizar los datos directamente
  }
}
