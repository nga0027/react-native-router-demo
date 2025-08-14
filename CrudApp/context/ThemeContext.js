import {createContext, useState} from 'react'
import { Appearance } from 'react-native'
import {ColorThemes} from '@/constants/ColorThemes'

export const ThemeContext = createContext([])

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
    const theme = colorScheme === 'dark' ? ColorThemes.dark : ColorThemes.light

    return (
        <ThemeContext.Provider value = {{
            colorScheme, setColorScheme, theme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}