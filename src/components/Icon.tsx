import styled from 'styled-components'
import { ComponentPropsWithoutRef } from 'react'

type ImageProps = ComponentPropsWithoutRef<'img'>

const Image = styled.img`
  width: 32px;
  height: 32px;
`
const Icon = ({ src }: ImageProps) => {
  return (
    <Image src={src} alt=''></Image>
  )
}

export default Icon