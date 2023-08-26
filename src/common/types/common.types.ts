export type ResponseType<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
}
