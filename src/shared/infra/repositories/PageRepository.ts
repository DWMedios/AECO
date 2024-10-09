import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from '@common/infra/entities'
import type { IPage } from '@common/domain/entities'
import type { IPageRepository } from '@shared/domain/repositories'
import type { CreatePageDto } from '../../../pages/domain/dto/PageDto'

export class PageRepository implements IPageRepository {
  constructor(
    @InjectRepository(Page)
    private readonly repository: Repository<IPage>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false

    const whereClause: { id?: number; name?: string } = {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name

    return this.repository.exists({ where: whereClause })
  }

  async create(createPage: CreatePageDto): Promise<IPage> {
    const qb = await this.repository
      .createQueryBuilder('page')
      .insert()
      .values(createPage)
      .returning('*')
      .execute()
    return qb.raw[0]
  }
}