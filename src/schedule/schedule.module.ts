import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, SupabaseService],
})
export class ScheduleModule {}
