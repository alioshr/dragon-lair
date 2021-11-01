import faker from 'faker'
import { UpdateDragonDTO } from '../usecases'

export const mockedUpdateDragonDTO = (): UpdateDragonDTO => ({
  id: faker.datatype.uuid(),
  body: {
    type: faker.random.words(2),
    name: faker.random.words(2)
  }
})
