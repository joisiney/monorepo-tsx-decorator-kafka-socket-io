import { INewsKeyDto, newsKeyDto } from '@/application/dto/id.dto'

import { NewsCreateUseCase } from '@/application/use-cases/news/create/index.use-case'
import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { NewsFindByIdUseCase } from '@/application/use-cases/news/find-id/index.use-case'
import {
  Controller,
  ControllerComposer,
  Injectable,
  Route,
} from '@olympus/lib-hera'
import { INewsAllDto, newsAllDto } from './dto/all.dto'
import { INewsDto, newsDto } from './dto/news.dto'

@Controller('/olympus/news/')
@Injectable({ dep: ['NewsFindAllUseCase', 'NewsCreateUseCase', 'NewsFindByIdUseCase'] })
export class NewsController extends ControllerComposer {
  constructor(
    private findAllUseCase: NewsFindAllUseCase
    , private createUseCase: NewsCreateUseCase
    , private findByIdUseCase: NewsFindByIdUseCase
  ) {
    super()
  }

  @Route({ method: 'GET', url: '/', dto: newsAllDto })
  async newsAll(input: INewsAllDto) {
    const response = await this.findAllUseCase.execute(input)
    return response
  }

  @Route({ method: 'GET', url: '/:id', dto: newsKeyDto })
  async newsById(input: INewsKeyDto) {
    return this.findByIdUseCase.execute(input)
  }

  @Route({ method: 'PUT', url: '/:id', dto: newsDto })
  async newsUpdate(input: INewsDto) {
    console.log('input', input)
    return { status: true }
  }

  @Route({ method: 'POST', url: '/', dto: newsDto })
  async newsCreate(data: INewsDto) {
    return this.createUseCase.execute(data)
  }

  @Route({ method: 'DELETE', url: '/:id' })
  async newsDelete(input: any) {
    console.log('input', input)
    return { status: true }
  }
}
