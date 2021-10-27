import { Dragon } from '../models'
import faker from 'faker'

export const mockedDragons = (): Dragon[] => [
  {
    createdAt: faker.date.recent(),
    histories: [],
    id: faker.datatype.uuid(),
    name: faker.random.words(2),
    type: faker.random.words(2)
  },
  {
    createdAt: faker.date.recent(),
    histories: [],
    id: faker.datatype.uuid(),
    name: faker.random.words(2),
    type: faker.random.words(2)
  },
  {
    createdAt: faker.date.recent(),
    histories: [],
    id: faker.datatype.uuid(),
    name: faker.random.words(2),
    type: faker.random.words(2)
  }
]
