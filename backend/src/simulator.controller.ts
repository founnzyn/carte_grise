import { Body, Controller, Post } from '@nestjs/common';
import { SimulatorService, SimulationRequest } from './simulator.service';

@Controller('simulate')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post()
  simulate(@Body() payload: SimulationRequest) {
    return this.simulatorService.estimate(payload);
  }
}
