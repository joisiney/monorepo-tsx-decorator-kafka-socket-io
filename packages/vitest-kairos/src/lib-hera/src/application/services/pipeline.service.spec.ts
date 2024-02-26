import {
  PipelineService,
  type PipeRequest,
} from '@olympus/lib-hera/src/application/services/pipeline.service'

import { beforeEach, describe, expect, it } from 'vitest'
describe('PipelineService', () => {
  let pipelineService: PipelineService

  beforeEach(() => {
    pipelineService = new PipelineService()
  })

  it('should add new pipes', () => {
    const pipe: PipeRequest = async (acc: Function) => acc
    pipelineService.add(pipe)
    expect((pipelineService as any)._pipes.length).toBe(1)
  })

  it('should execute the pipeline', async () => {
    const pipe1: PipeRequest = async (acc: Function) => acc + ' World'
    const pipe2: PipeRequest = async (acc: Function) => acc + '!'

    pipelineService.add(pipe1, pipe2)

    const result = await pipelineService.execute('Hello')
    expect(result).toBe('Hello World!')
  })
})
