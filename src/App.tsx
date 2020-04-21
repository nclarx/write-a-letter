import {
    AppBar,
    Container,
    createStyles,
    IconButton,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
}                             from '@material-ui/core'
import { makeStyles }         from '@material-ui/core/styles'
import { AccountCircle }      from '@material-ui/icons'
import React                  from 'react'
import './App.css'
import Postcard               from './components/Postcard'
import useAuthState           from './hooks/UseAuthState'
import useObservable          from './hooks/UseObservable'
import { ImageMeta }          from './models/imageMeta'
import AuthService            from './services/AuthService'
import { getImageCollection } from './services/ImageMetaService'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
)

function App() {

    const classes = useStyles()
    const auth = useAuthState()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const postcards = useObservable<ImageMeta[]>(
        getImageCollection(process.env.REACT_APP_IMAGE_SET_PATH || 'path/to/imageSet')
    )

    const handleLogin = () => {
        AuthService.login()
    }

    const handleLogout = () => {
        AuthService.logout()
    }

    const renderCardList = () => (
        <section>
            <ul>
                {
                    postcards && postcards.map((card, idx) => (
                        <div key={idx}>
                            <Postcard postcard={card} />
                        </div>
                    ))
                }
            </ul>
        </section>
    )

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant={'h6'} className={classes.title}>Write A Letter</Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {
                                auth ? (
                                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                                ) : (
                                    <MenuItem onClick={() => handleLogin()}>Login</MenuItem>
                                )
                            }
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            <Container>
                <main className="App">
                    {
                        renderCardList()
                    }
                </main>
            </Container>
        </>
    )
}

export default App
