import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#1D3051',
        main: '#091E42',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#fff',
        dark: '#ba000d',
        text: "grey",
        contrastText: '#000',
      },
    },
    typography: {
        overline: {
            color: 'grey'
        },
        h4:{
            color: '#fff'
        }
    }
});