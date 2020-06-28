import { makeStyles } from '@material-ui/core/styles'
import { theme } from './style'

export const useStyles = makeStyles({
    paper: {
        '&:focus':{
            border: 'none'
        },
      position: 'absolute',
      left: '35vw',
      top: '40vh',
      width: '30vw',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    back: {
        backgroundColor: 'rgba(4, 12, 26, 0.5)'
    },
    actionButton: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "25px",
        cursor: 'pointer',
        color: theme.palette.primary.contrastText,
        height: "25px",
        width: "75px",
    }
});