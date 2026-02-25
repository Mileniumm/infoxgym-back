import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService.client
      .from('days')
      .select(
        'id, name, schedules (id, start_time, end_time, activity, trainer)',
      )
      .order('id');

    if (error) throw new BadRequestException(error.message);
    return {
      message: 'Horario obtenido exitosamente',
      data: data,
    };
  }

  async create(day_id: number, schedule) {
    const { data, error } = await this.supabaseService.client
      .from('schedules')
      .insert({ day_id, ...schedule })
      .select();
    if (error) throw new BadRequestException(error.message);
    return {
      message: 'Horario creado correctamente',
      data: data,
    };
  }

  async update(day_id: number, schedule) {
    const { data, error } = await this.supabaseService.client
      .from('schedules')
      .update({ day_id, ...schedule })
      .eq('id', day_id)
      .select();
    if (error) throw new BadRequestException(error.message);
    return {
      message: `Horario con id ${day_id} actualizado correctamente`,
      data: data,
    };
  }
  async remove(day_id: number) {
    const { error } = await this.supabaseService.client
      .from('schedules')
      .delete()
      .eq('id', day_id);
    if (error) throw new BadRequestException(error.message);
    return {
      message: `Horario con id ${day_id} eliminado correctamente`,
    };
  }
}
