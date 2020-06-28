import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { theme } from '../assets/style'

const useStyles = makeStyles(() =>
  createStyles({
    innerBullet: {
        position:'absolute',
        marginTop: '5%',
        marginLeft: '5%',
        backgroundColor: theme.palette.primary.main,
        width:"90%",
        height: "90%",
        borderRadius: "50%",
        color: theme.palette.primary.contrastText,
        fontWeight: 700,
    },
    important:{
        position:'absolute',
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        border: "1px solid black",
        animation: 'circle_beat 2s infinite linear'
    },
    bullet:{
        position:'absolute',
        width: "12px",
        height: "12px",
        padding: '3px',
        borderRadius: "50%",
        border: "1px solid black",
        // animation: 'circle_beat 2s infinite linear'
    },
    bulletNotImportant:{
        position:'absolute',
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
    },
    vip: {
        position: 'absolute',
        fontWeight:900,
        color:'black',
    },
    square:{
        position:'absolute',
        top:'-30px',
        width: '100%',
        height: '30px',
        overflowWrap: 'normal',
        wordWrap: 'normal',
        whiteSpace: 'nowrap',
    },
    name:{
        position:'relative',
        // width:'75%',
        padding: '5px',
        backgroundColor: theme.palette.secondary.main,
    },
    id:{
        position:'relative',
        color: theme.palette.primary.contrastText,
        // width:'25%',
        padding: '5px',
        backgroundColor: theme.palette.primary.main,
    },
    final:{
        backgroundColor: 'red !important',
        zIndex:2,
        width: "15px",
        height: "15px",
    },
    middle:{
        backgroundColor: 'yellow !important',
        zIndex:3,
    },
    info:{
        backgroundColor: `${theme.palette.primary.main} !important`,
        zIndex:1,
    }
  })
)



const Marker = ({ action, selected, type, number, text, important }) => {
    const classes = useStyles()

    const renderImportant = () => {
        if(important){
            return (
                <div className={ `${classes.important} ${classes[type] ? classes[type] : ''}` }>
                    <div className={ classes.innerBullet }>
                        <h3 className={classes.vip}>
                            { text }
                        </h3>
                    </div>
                </div>
            )
        }
        return ''
    }

    const renderNotImportant = () => {
        if(!important){
            return (
                <div className={ `${classes.bulletNotImportant} ${classes[type] ? classes[type] : ''} ${selected ? classes.bullet : ''}` }
                    onClick={ () => (typeof action == "function") ? action(number) : null }
                >
                    <div className={ classes.square }>
                        <span className={ classes.id }>
                            { number }
                        </span>
                        <span className={ classes.name }>
                            { text }
                        </span>
                    </div>
                </div>)
        }
        return ''
    }

    return (
        <React.Fragment>
            <div>
                { renderNotImportant() }    
                {  renderImportant() }
            </div>
        </React.Fragment>
    )
}

export default Marker