import { PipelineService } from '@olympus/lib-hera'
import { IRoute } from './index.dto'

export class BaseAppAdapter {
  public reqPipeline = new PipelineService()
  public resPipeline = new PipelineService()
  public errorPipeline = new PipelineService()

  protected execute = async (
    request: any,
    reply: any,
    props: IRoute.AddProps,
  ) => {
    const dataReq = await this.reqPipeline.execute({}, request, props)
    const response = await this.resPipeline.execute(dataReq, reply, props)
    let code = 200
    let data = response
    if ('code' in response) {
      code = response.code
    }
    if ('data' in response) {
      data = response.data
    }
    return { code, data }
  }
}
