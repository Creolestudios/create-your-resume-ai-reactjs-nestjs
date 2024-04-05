import { Module } from '@nestjs/common';
import { LazyresumeController } from './lazyresume.controller';
import { LazyresumeService } from './lazyresume.service';

@Module({
  controllers: [LazyresumeController],
  providers: [LazyresumeService]
})
export class LazyresumeModule {}
