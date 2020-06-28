import React from 'react'
import { Card, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { theme } from '../assets/style'

const useStyles = makeStyles({
    goWorkerCard: {
        backgroundColor:'#091E99',
        // backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
})

const GoWorker = (props) => {
    const classes = useStyles()
    return (
        <Card className={classes.goWorkerCard} >
            <img src={ props.pic } alt={ props.name } style={{ width:'100%' }}/>
            <Typography variant="body1" className="alux-name">
                { props.name }
            </Typography>
            <Typography variant="subtitle1" className="alux-position">
                { props.position }
            </Typography>
        </Card>
    )
}

export default GoWorker
