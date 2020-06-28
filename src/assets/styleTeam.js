import { makeStyles } from '@material-ui/core/styles'
import { theme } from './style'

export const useStyles = makeStyles({
    title:{
        color: theme.palette.primary.contrastText,
        fontWeight: 900,
    },
    subtitle:{
        color: "white"
    },
    goWorkerCard: {
        backgroundColor: theme.palette.primary.main ,
    },
    goWorkerContainer:{
        cursor:'pointer',
    },
    containerLoading:{
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1301
    },
    loading : {
        position: 'absolute',
        left: '45vw',
        top: '50vh',
        zIndex: 1302,
        textAlign: 'center'
    },
    textLoading:{
        color: theme.palette.primary.contrastText,

    }
})