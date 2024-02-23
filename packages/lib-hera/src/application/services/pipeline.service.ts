type PipeRequest = (acc: any, ...rest: any[]) => Promise<any>
export class PipelineService {
  private _pipes: PipeRequest[] = []

  public add(...rest: PipeRequest[]) {
    this._pipes.push(...rest)
  }

  public async execute(initialAcc: any, ...rest: any[]) {
    return await this._pipes.reduce(async (acc, pipe) => {
      const data = await acc
      return pipe(data, ...rest)
    }, Promise.resolve(initialAcc))
  }
}
