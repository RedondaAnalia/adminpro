import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
              public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5 );
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('Token');
      this.usuario = JSON.parse(localStorage.getItem('Usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id);
    localStorage.setItem('Token', token);
    localStorage.setItem('Usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario ( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
                    .map( (resp: any) => {
                      swal('Usuario creado', usuario.email, "success");
                      return resp.usuario;

                    });

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('Token');
    localStorage.removeItem('Usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token } ).map( (resp: any ) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                    .map( (res: any) => {
                      this.guardarStorage(res.id, res.token, res.usuario);
                      return true;
                    });

  }

}
