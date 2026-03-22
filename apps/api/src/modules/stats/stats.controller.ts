import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { StatsService } from "./stats.service";

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  @ApiOperation({ summary: "Get public platform statistics" })
  getStats() {
    return this.statsService.getPublicStats();
  }
}
