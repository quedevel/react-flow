import styled from 'styled-components'
import { ComponentPropsWithoutRef } from 'react'

const MainDiv = styled.div`
  display: flex;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  gap: 10px;
`

type MenuProps = ComponentPropsWithoutRef<'div'>

const MainMenu = ({children}: MenuProps) => {
  return (
    <MainDiv>
      {children}
    </MainDiv>
  )
}

export default MainMenu