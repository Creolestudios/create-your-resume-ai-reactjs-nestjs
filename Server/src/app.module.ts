import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { LazyresumeModule } from "./lazyresume/lazyresume.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "src", "files"),
      serveRoot: "/files",
    }),
    AuthModule,
    LazyresumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
