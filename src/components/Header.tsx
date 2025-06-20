import styled from 'styled-components'
import Icon from './Icon'
import MainMenu from './MainMenu'
import MenuButton from './MenuButton'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as React from 'react'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(236, 236, 236);
  padding: 10px 10px;
  height: 5vh;
`

interface ButtonData {
  name: string
  path: string
}

const Header: React.FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<string>(i18n.language || 'en')

  const buttons: ButtonData[] = [
    { name: t('menu.workflow'), path: '/' },
    { name: t('menu.schedule'), path: '/schedule' },
    { name: t('menu.history'), path: '/history' },
  ]

  const menuHandler = (path: string) => {
    nav(path)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    setLanguage(newLang)
    i18n.changeLanguage(newLang).then()
  }

  return (
    <StyledDiv>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Icon src={'images/icon1.png'} />
        <MainMenu>
          {buttons.map((item) => (
            <MenuButton
              key={item.path} // path를 key로 사용 (uuid 제거)
              text={item.name}
              isSelected={item.path === pathname}
              onClick={() => menuHandler(item.path)}
            />
          ))}
        </MainMenu>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '20px' }}>
        <select value={language} onChange={handleChange}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
        <div>{t('menu.logout')}</div>
      </div>
    </StyledDiv>
  )
}

export default Header
