import styled from 'styled-components'

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`

interface Props {
  text: string
}

const Button = ({ text }: Props) => {
  return (
    <StyledButton>{text}</StyledButton>
  )
}

export default Button