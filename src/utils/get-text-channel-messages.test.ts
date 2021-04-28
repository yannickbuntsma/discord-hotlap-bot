import { getMessages } from './get-text-channel-messages'

const createId = function () {
  return '_' + Math.random().toString(36).substr(2, 9)
}

/**
 * Create long array of some IDs to test concurrent fetching.
 */
const mockMessages: string[] = []
for (let i = 0; i < 305; i++) {
  mockMessages.push(createId())
}

type Options = { limit?: number; skip?: number }
function limitArray<T extends any>(arr: T[], opts?: Options) {
  const limit = opts?.limit && opts.limit < 100 ? opts.limit : 100 + (opts?.skip || 0)
  return arr.slice(opts?.skip || 0, limit)
}

const mockFetch = jest.fn()
const channel = {
  type: 'text',
  messages: {
    array: jest.fn(),
    fetch: mockFetch,
  },
}
const fetchMockImplementation = (opts?: Options) => () => {
  const result = limitArray(mockMessages, opts)
  return Promise.resolve({
    array: () => result,
    last: () => result[result.length - 1],
  })
}

describe('getMessages', () => {
  it('should always call fetch with a limit of 100', async () => {
    expect.assertions(2)
    mockFetch.mockImplementation(fetchMockImplementation({ limit: 55 }))

    const result = await getMessages(channel as any)
    expect(mockFetch).toHaveBeenNthCalledWith(1, { limit: 100 })
    expect(result).toHaveLength(55)
  })

  it('should fetch less than 100 messages', async () => {
    expect.assertions(2)
    mockFetch.mockImplementation(fetchMockImplementation({ limit: 55 }))

    const result = await getMessages(channel as any)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(55)
  })

  it('should fetch more than 100 messages', async () => {
    expect.assertions(3)
    mockFetch
      .mockImplementationOnce(fetchMockImplementation())
      .mockImplementationOnce(fetchMockImplementation({ skip: 100 }))
      .mockImplementationOnce(fetchMockImplementation({ skip: 200 }))
      .mockImplementationOnce(fetchMockImplementation({ skip: 300 })) // 5 left in this response

    expect(mockMessages).toHaveLength(305)

    const result = await getMessages(channel as any)
    expect(mockFetch).toHaveBeenCalledTimes(4)
    expect(result).toHaveLength(305)
  })
})
