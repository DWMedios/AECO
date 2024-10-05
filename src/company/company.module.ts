import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { COMPANY_REPOSITORY } from '@domain-repositories'
import { CompanyRepository } from '@infra-repositories'
import { Company } from '@infra-entities'
import { COMPANY_SERVICE } from './domain/ICompanyService'
import { CompanyController } from './infra/company.controller'
import { CompanyService } from './app/company.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_SERVICE,
      useClass: CompanyService,
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
