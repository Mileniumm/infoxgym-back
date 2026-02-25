import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule, SchedulePost } from './entities/schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post(':day_id')
  create(@Param('day_id') day_id: string, @Body() schedule: SchedulePost) {
    const id = parseInt(day_id);
    return this.scheduleService.create(id, schedule);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Put(':id')
  update(@Param('id') day_id: string, @Body() schedule: Schedule) {
    const id = parseInt(day_id);
    return this.scheduleService.update(+id, schedule);
  }

  @Delete(':id')
  remove(@Param('id') day_id: string) {
    const id = parseInt(day_id);
    return this.scheduleService.remove(id);
  }
}
