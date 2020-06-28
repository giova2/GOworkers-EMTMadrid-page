import React from 'react'
import GoWorker from './GoWorker'
import MyModal from './MyModal'
import { Grid, Typography, CircularProgress } from '@material-ui/core'
import { planTravel } from '../assets/js/api'
import pruebaTrip from '../assets/info'
import { theme } from '../assets/style'
import { useStyles } from '../assets/styleTeam'

const GOWORK= { lat: 40.4338849, lng: -3.6985604 }

const Team = ({ tripData, stopsData }) => {
    const classes = useStyles(theme)
    const [Modalopen, setModalOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [userHomeAddress, setUserHomeAddress] = React.useState({})
    const [userName, setUserName] = React.useState('')
  
    // Aqui, teniendo un punto de partida y la direccion de la casa, porque la direccion de GOWORK es global,
    // buscamos el mejor camino para llegar allí 
    const handleClickSeek = (from, homeUserAddress) => {
        setLoading(true)
        let a, b
        if(from == 'home'){
            a = homeUserAddress
            b = GOWORKAddress
        }else{
            a = GOWORKAddress
            b = homeUserAddress
        }
        planTravel(a, b).then( res => {
            const trip = (res.trip && res.trip.code == "00") ? res.trip : pruebaTrip.trip
            const stopsA = (res.stopsA) ? res.stopsA : pruebaTrip.stopsA
            const stopsB = (res.stopsB) ? res.stopsB : pruebaTrip.stopsB
            tripData(trip)
            stopsData(stopsA, stopsB)
            setLoading(false)
            setModalOpen(false)
            setLoading(false)
        })
    }

    const handleUserHomeAddress = (val) => {
        setUserHomeAddress(val);
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }
    
    const renderLoading = () => {
        if(loading){
            return (<div className={ classes.containerLoading }>
                <div className={ classes.loading }>
                    <CircularProgress/>
                    <h2 className={ classes.textLoading } >Searching routes..</h2>
                </div>
            </div>
            )
        }
    }

    const GOWORKAddress = { street:'Calle Rafael Calvo' , number: 18, lat: 40.433918, lng: -3.694181 }
    const goWorkers = [
        { pic: '../../images/profile.png', name: 'User1', position: 'CEO', houseAddress:{ street:'Calle del oso', number: 8, lat: 40.4098237, lng: -3.7045853 }},
        { pic: '../../images/profile2.png', name: 'User2', position: 'Developer', houseAddress:{ street:'Calle Nicolás Sánchez', number: 19, lat:40.386271, lng: -3.706334 }},
        { pic: '../../images/profile.png', name: 'User3', position: 'Designer', houseAddress:{ street:'Calle de Canarias', number: 27, lat: 40.402271, lng: -3.692672 }},
        { pic: '../../images/profile2.png', name: 'User4', position: 'bas', houseAddress:{ street:'Calle de Echegaray', number: 9, lat: 40.415912, lng: -3.699527 }},
        { pic: '../../images/profile.png', name: 'User5', position: 'adsdas', houseAddress:{ street:'Calle de Altamirano', number: 9, lat: 40.431066, lng: -3.718416 }},
        { pic: '../../images/profile2.png', name: 'User6', position: 'asdsa', houseAddress:{ street:'Calle de Alberto Bosch', number: 38, lat: 40.413727, lng: -3.689054 }},
        { pic: '../../images/profile.png', name: 'User7', position: 'CEO', houseAddress:{ street:'Calle del oso', number: 8, lat: 40.4098237, lng: -3.7045853 }},
        { pic: '../../images/profile2.png', name: 'User8', position: 'Developer', houseAddress:{ street:'Calle Nicolás Sánchez', number: 19, lat:40.386271, lng: -3.706334 }},
        { pic: '../../images/profile.png', name: 'User9', position: 'Designer', houseAddress:{ street:'Calle de Canarias', number: 27, lat: 40.402271, lng: -3.692672 }},
        { pic: '../../images/profile2.png', name: 'User10', position: 'bas', houseAddress:{ street:'Calle de Echegaray', number: 9, lat: 40.415912, lng: -3.699527 }},
        { pic: '../../images/profile.png', name: 'User11', position: 'adsdas', houseAddress:{ street:'Calle de Altamirano', number: 9, lat: 40.431066, lng: -3.718416 }},
        { pic: '../../images/profile2.png', name: 'User12', position: 'asdsa', houseAddress:{ street:'Calle de Alberto Bosch', number: 38, lat: 40.413727, lng: -3.689054 }},
        { pic: '../../images/profile.png', name: 'User13', position: 'asdsa', houseAddress:{ street:'Calle de Alberto Bosch', number: 38, lat: 40.413727, lng: -3.689054 }},
        { pic: '../../images/profile2.png', name: 'User14', position: 'CEO', houseAddress:{ street:'Calle del oso', number: 8, lat: 40.4098237, lng: -3.7045853 }},
        { pic: '../../images/profile.png', name: 'User15', position: 'Developer', houseAddress:{ street:'Calle Nicolás Sánchez', number: 19, lat:40.386271, lng: -3.706334 }},
        { pic: '../../images/profile2.png', name: 'User16', position: 'Designer', houseAddress:{ street:'Calle de Canarias', number: 27, lat: 40.402271, lng: -3.692672 }},
        { pic: '../../images/profile.png', name: 'User17', position: 'bas', houseAddress:{ street:'Calle de Echegaray', number: 9, lat: 40.415912, lng: -3.699527 }},
        { pic: '../../images/profile2.png', name: 'User18', position: 'adsdas', houseAddress:{ street:'Calle de Altamirano', number: 9, lat: 40.431066, lng: -3.718416 }},
        { pic: '../../images/profile.png', name: 'User19', position: 'asdsa', houseAddress:{ street:'Calle de Alberto Bosch', number: 38, lat: 40.413727, lng: -3.689054 }},
        
    ]
    return (
        <Grid container spacing={2} style={ {marginBottom: '15px'} }>
            { renderLoading() }
            <MyModal user={ userName } 
                open={ Modalopen } 
                handleClose={ handleModalClose } 
                handleClickSeek={ handleClickSeek } 
                userHomeAddress={ userHomeAddress } />
            <Grid item xs={12} style={{ margin: '15px'}}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Team
                </Typography>
                <Typography variant="h4">
                    goWorkers 
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container={true} spacing={1} >
                { goWorkers.map( ({pic, name, position, houseAddress}) =>{
                    return <Grid item xs={6} sm={4} md={2} key={ name } style={{ textAlign: 'center' }}>
                            <div className={ classes.goWorkerContainer }
                                onClick={ () => {
                                setUserName(name)
                                handleUserHomeAddress(houseAddress)
                                handleModalOpen()
                            }}>
                                <GoWorker pic={ pic } name={ name } position={ position } 
                                />
                            </div>
                        </Grid>
                })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Team;