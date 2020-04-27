interface StackItem {
  line: number
  column: number
  filename: string
}
export interface ErrorMessage {
  message: string
  stack: StackItem[]
}

export function parseError(err: Error): ErrorMessage {
  const errList = (err.stack || '').split('\n')
  if (!errList.length) return { message: '', stack: [] }
  let message = errList[0]
  message = message ? message.replace(/\w+:\s/, '') : ''
  const stack: StackItem[] = errList
    .filter((err) => err.includes('http'))
    .map((err) => {
      const index = err.indexOf('http')
      return err.slice(index)
    })
    .map((err) => {
      const split = err.split(':')
      const [line, column] = split.splice(-2)
      return {
        line: +line,
        column: +column,
        filename: split.join(':'),
      }
    })
  return { message, stack }
}
