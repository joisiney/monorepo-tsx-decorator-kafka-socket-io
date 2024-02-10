export namespace IUpdateByIdUseCase {
  export interface Input {
    id: string
    title?: string
    description?: string
    content?: string
    thumbnail?: string
  }
}
