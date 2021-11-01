import faker from 'faker'
import { AddDragonDTO } from '../usecases'

export const mockedAddDragonDTO = (): AddDragonDTO => ({
  type: faker.random.words(2),
  name: faker.random.words(2)
})
