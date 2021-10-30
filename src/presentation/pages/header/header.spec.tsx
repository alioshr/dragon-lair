import React from 'react'
import { DeleteAccessTokenStub, GetAccessTokenStub } from '@/presentation/test'
import { render, RenderResult } from '@testing-library/react'
import { Header } from '..'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  deleteAccessTokenStub: DeleteAccessTokenStub
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (): SutTypes => {
  const deleteAccessTokenStub = new DeleteAccessTokenStub()
  const getAccessTokenStub = new GetAccessTokenStub()
  const sut = render(
    <Router history={history}>
      <Header
        deleteAccessToken={deleteAccessTokenStub}
        getAccessToken={getAccessTokenStub}
      >
        <div></div>
      </Header>
    </Router>
  )
  return { sut, deleteAccessTokenStub }
}

describe('Header', () => {
  test('Should call DeleteAccess token with the correct params', () => {
    makeSut()
  })
})
