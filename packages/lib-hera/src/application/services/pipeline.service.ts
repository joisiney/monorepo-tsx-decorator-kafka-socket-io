type PipeRequest = (acc: any, ...rest: any[]) => Promise<any>
export class PipelineService {
  private _pipes: PipeRequest[] = []

  public add(...rest: PipeRequest[]) {
    this._pipes.push(...rest)
  }

  public async execute(initialAcc: any, ...rest: any[]) {
    return await this._pipes.reduce(async (acc, pipe) => {
      try {
        const data = await acc
        return pipe(data, ...rest)
      } catch (e) {
        return {}
      }
    }, Promise.resolve(initialAcc))
  }
}
