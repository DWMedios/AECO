import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RewardCategory } from '../../../common/infra/entities/RewardCategory.entity'
import type { IRewardCategory } from '../../../common/domain/entities/IRewardCategory'
import type { CreateRewardCategoryDto } from '../../../reward-category/domain/dto/RewardCategoryDto'
import type { IRewardCategoryRepository } from '../../domain/repositories/IRewardCategoryRepository'

export class RewardCategoryRepository implements IRewardCategoryRepository {
  constructor(
    @InjectRepository(RewardCategory)
    private readonly repository: Repository<IRewardCategory>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false

    const whereClause: { id?: number; name?: string } = {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name

    return this.repository.exists({ where: whereClause })
  }

  async create(
    createRewardCategory: CreateRewardCategoryDto,
  ): Promise<IRewardCategory> {
    const qb = await this.repository
      .createQueryBuilder('reward_category')
      .insert()
      .values(createRewardCategory)
      .returning('*')
      .execute()
    return qb.raw[0]
  }
}