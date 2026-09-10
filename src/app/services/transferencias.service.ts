import { TransferenciaEntity } from '@/models/entities/transferencia.entity';
import { TransferenciasRepository } from '@/models/repositories/transferencias.repository';
import { TransferenciasResponse } from '@/models/responses/transferencias.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransferenciasService implements TransferenciasRepository {
  constructor(private http: HttpClient) {}

  getAll(cuit: string): Observable<TransferenciaEntity[]> {
    const headers = new HttpHeaders({ CUIT: cuit });

    return this.http
      .get<TransferenciasResponse>(`${environment.baseUrl}/transferencias`, {
        headers,
      })
      .pipe(map((response) => response.transferencias));
  }
}
