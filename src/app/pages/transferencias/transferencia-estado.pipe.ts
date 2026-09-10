import { tranfEstado, TranfEstado } from '@/models/consts';
import { Pipe, PipeTransform } from '@angular/core';

const estadoLabels: Record<TranfEstado, string> = {
  [tranfEstado.aprobado]: 'Aprobado',
  [tranfEstado.rechazado]: 'Rechazado',
  [tranfEstado.pendiente]: 'Pendiente',
};

@Pipe({ name: 'transferenciaEstado' })
export class TransferenciaEstadoPipe implements PipeTransform {
  transform(estado: TranfEstado): string {
    return estadoLabels[estado];
  }
}
