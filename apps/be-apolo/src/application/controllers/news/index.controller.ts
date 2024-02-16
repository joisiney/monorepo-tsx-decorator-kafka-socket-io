import { INewsKeyDto, newsKeyDto } from '@/application/dto/id.dto'

import { NewsCreateUseCase } from '@/application/use-cases/news/create/index.use-case'
import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { NewsFindByIdUseCase } from '@/application/use-cases/news/find-id/index.use-case'
import { NewsRemoveByIdUseCase } from '@/application/use-cases/news/remove/index.use-case'
import { NewsUpdateByIdUseCase } from '@/application/use-cases/news/update/index.use-case'
import {
  Controller,
  ControllerComposer,
  Injectable,
  Route,
} from '@olympus/lib-hera'
import { INewsAllDto, newsAllDto } from './dto/all.dto'
import { INewsDto, newsDto } from './dto/news.dto'
import { INewsUpdateDto, newsUpdateDto } from './dto/put.dto'

@Controller('/olympus/news/')
@Injectable({
  dep: [
    'NewsFindAllUseCase',
    'NewsCreateUseCase',
    'NewsFindByIdUseCase',
    'NewsUpdateByIdUseCase',
    'NewsRemoveByIdUseCase',
  ],
})
export class NewsController extends ControllerComposer {
  constructor(
    private findAllUseCase: NewsFindAllUseCase,
    private createUseCase: NewsCreateUseCase,
    private findByIdUseCase: NewsFindByIdUseCase,
    private updateByIdUseCase: NewsUpdateByIdUseCase,
    private removeByIdUseCase: NewsRemoveByIdUseCase,
  ) {
    super()
  }

  @Route({ method: 'GET', url: '/', dto: newsAllDto })
  async newsAll(input: INewsAllDto) {
    return this.findAllUseCase.execute(input)
  }

  @Route({ method: 'GET', url: '/:id', dto: newsKeyDto })
  async newsById(input: INewsKeyDto) {
    return this.findByIdUseCase.execute(input)
  }

  @Route({ method: 'POST', url: '/', dto: newsDto })
  async newsCreate(data: INewsDto) {
    return this.createUseCase.execute(data)
  }

  @Route({ method: 'PUT', url: '/:id', dto: newsUpdateDto })
  async newsUpdate(input: INewsUpdateDto) {
    return this.updateByIdUseCase.execute(input)
  }

  @Route({ method: 'DELETE', url: '/:id', dto: newsKeyDto })
  async newsDelete(input: INewsKeyDto) {
    return this.removeByIdUseCase.execute(input)
  }
}
