import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('jwt'); // Récupérer le jeton d'authentification depuis le stockage local
    if (authToken) {
      // Si le jeton existe, l'ajouter à l'en-tête de la requête

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    } else {
      // Si le jeton n'existe pas, envoyer la requête telle quelle

      return next.handle(req);
    }
  }
}
