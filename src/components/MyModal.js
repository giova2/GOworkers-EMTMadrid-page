import React from 'react'
import { Modal, Grid } from '@material-ui/core'
import { useStyles } from '../assets/styleMyModal'


const MyModal = ({ user, open, handleClose, handleClickSeek, userHomeAddress}) => {
    const classes = useStyles();

    return (
        <div className={ classes.back }>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={ open }
                onClose={ handleClose }
            >
                <Grid container 
                    direction="column" 
                    justify="center"
                    alignItems="center"
                    style={{ height:'100vh' }}
                    >
                    <Grid item xs={8} md={4} style={{ backgroundColor: '#fff', paddingBottom:'20px', paddingTop:'20px' }}>
                        <Grid container spacing={2} style={{ textAlign:'center' }} 
                            justify="center">
                            <Grid item xs={12}>
                                <button className="close" onClick={ handleClose }>close</button>
                            </Grid>
                            <Grid item xs={12}>
                                <h2 id="simple-modal-title" style={{ textAlign:"center" }}>
                                    Hey { user },
                                </h2>
                                <h2 id="simple-modal-title" style={{ textAlign:"center" }}>
                                    ¿What is your direction goWorker?
                                </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={10} > 
                                    <Grid item xs={6} style={{ textAlign:"center" }}>
                                        <button className={ classes.actionButton } onClick={ () => handleClickSeek('home', userHomeAddress) }>home</button>
                                    </Grid>
                                    <Grid item xs={6} style={{ textAlign:"center" }}>
                                        <button className={ classes.actionButton } onClick={ () => handleClickSeek('work', userHomeAddress) }>work</button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>
            </Modal>
        </div>
    );
}

export default MyModal