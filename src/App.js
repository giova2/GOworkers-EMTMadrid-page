import React, { useEffect } from 'react'
import Team from './components/Team'
import Map from './components/Map'
import Results from './components/Results'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Input, Hidden, Grid, AppBar, Toolbar, Typography, Button, IconButton, 
      Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { loginApp, refreshToken } from './assets/js/api'
import { theme } from './assets/style'
import { useStyles } from './assets/styleApp'
import stopsPrueba from './assets/info'
import './App.css'

const App = () => {
  const classes = useStyles()
  const [stopsA, setStopsA]         = React.useState(stopsPrueba.stopsA)
  const [stopsB, setStopsB]         = React.useState(stopsPrueba.stopsB)
  const [tripParams, setTripParams] = React.useState(stopsPrueba.trip)//{})
  const [selectedStop, setSelectedStop] = React.useState(null)
  const [back, setBack]             = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
      refreshToken() && loginApp()
    }, [])

    // funcionamiento del dropdown
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    // esta funcion la pasamos como parámetro a Team y se ocupará de manipular los datos de viaje,
    // los datos de stopsA y stopsB los manipularemos en otra función
    const handleTrip = (trip) =>{
      setTripParams(trip)
    }

    // Manipulamos los datos de las paradas para mostrarlos en 
    const handleStopsData = (sA, sB) => {
      setBack(false)
      setStopsA(sA)
      setStopsB(sB)
    }

    // coords es un array de la forma [lat, lng]
    const changeStop = (coords) => {
      
    }

    const renderTeam = () => {
      let mainClass = ''
      if(!back){
        mainClass = classes.hide
      }
      return (
        <div className={ mainClass }>
          <Grid container alignContent="center" className={ classes.welcome }> 
              <Hidden only={['xs', 'sm']}>
                <Grid item md={8} >
                  <span className={ classes.dontbelate }>Don't be late, goWorker</span>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={4} className={ classes.containerSearch } >
                <Input className={ classes.inputsearch } 
                  placeholder="what is your stop? " name="destino" 
                />
                <SearchIcon className={ classes.searchIcon} />
              </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={12}>
              <Team 
                tripData={ handleTrip }
                stopsData={ handleStopsData }
              />
            </Grid>
          </Grid>
        </div>
      )
    }

    const renderResults = () => {
        let mainClass = ''
        if(back){
          mainClass = classes.hide
        }
        return (
          <Grid container className={ classes.results && mainClass } >
            <Grid item xs={12} md={6}>
              <KeyboardBackspaceIcon className={ classes.backButton } onClick={ () => setBack(true)}/> 
              <Results 
                trip={ tripParams } 
                selectStop={ setSelectedStop } 
                stopSelected={ selectedStop }
                />
            </Grid>
            <Grid item xs={12} md={6} className={ classes.map }>
              <Map trip={ tripParams }
                selectStop={ setSelectedStop } 
                stopSelected={ selectedStop }
                stopsA={ stopsA } 
                stopsB={ stopsB } 
              />
            </Grid>
          </Grid>
        )
    } 
  
    return (
      <div className="App">
        <ThemeProvider theme={ theme }>
          <Grid container={true} className={ classes.root }>
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={ classes.title }>
                    GOWORK
                  </Typography>
                  <Hidden only={[ 'md', 'lg', 'xl']}>
                    <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu" 
                      onClick={ handleClick }>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      keepMounted
                      anchorEl={ anchorEl }
                      open={Boolean(anchorEl)}
                      onClose={ handleClose }
                      className={classes.menu}
                    >
                    </Menu>
                  </Hidden>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              { renderTeam() }
              { renderResults() }              
            </Grid>
          </Grid>
          
        </ThemeProvider>
      </div>
    );
  
}

export default App;
