import styled from 'styled-components'
import { ComponentPropsWithoutRef } from 'react'

const Div = styled.div<{ $isSelected: boolean }>`
  font-weight: ${(props) => (props.$isSelected ? 'bold' : 'none')};
  border-radius: 3px;
  cursor: pointer;
`

interface Props extends ComponentPropsWithoutRef<'div'> {
  text: string,
  isSelected: boolean,
  onClick?: () => void
}


const MenuButton = ({ text, isSelected, onClick }: Props) => {
  return (
    <Div $isSelected={isSelected} onClick={onClick}>{text}</Div>
  )
}

export default MenuButton