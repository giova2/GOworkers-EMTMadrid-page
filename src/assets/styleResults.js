import { makeStyles } from '@material-ui/core/styles'
import { theme } from './style'

export const useStyles = makeStyles({
    root: {
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        paddingBottom: 12,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        minHeight: '150px',
        maxHeight: '150px',
        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            cursor: 'pointer',
        }
    },
    selected:{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    busIcon:{
        position: 'absolute',
        left: '-25px',
        top: '0px',
        color: 'aquamarine',
    },
    containerResults:{
        overflow: 'scroll',
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 900,
    },
    titleResults: {
        position: 'relative',
        color: theme.palette.primary.contrastText,
        textAlign: 'left',
        marginLeft: '35px'
    },
    pos: {
        marginBottom: 12,
    },
  });