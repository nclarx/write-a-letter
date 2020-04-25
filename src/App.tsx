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
}                        from '@material-ui/core'
import { makeStyles }    from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { observer }     from 'mobx-react'
import React, {
    useEffect,
    useState
}                       from 'react'
import './App.css'
import ImageMetaList    from './components/ImageMetaList'
import useAuthState     from './hooks/UseAuthState'
import { ImageMeta }    from './models/imageMeta'
import AuthService      from './services/AuthService'
import ImageMetaService from './services/ImageMetaService'
import ImageMetaStore   from './stores/ImageMetaStore'

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

const App = observer(() => {

    const classes = useStyles()
    const auth = useAuthState()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const
        [imageMeta, setImageMeta] = useState<ImageMeta[] | undefined>()

    useEffect(() => {
        const imageMetaSubscription = ImageMetaService.getImageCollection(process.env.REACT_APP_IMAGE_SET_PATH || '')
        setImageMeta(ImageMetaService.imageMetaCollection)
        return () => imageMetaSubscription.unsubscribe()
    }, [])

    const handleLogin = () => {
        AuthService.login()
    }

    const handleLogout = () => {
        AuthService.logout()
    }


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
                    <ImageMetaList imageMeta={ImageMetaStore.getAllImageMeta} />
                </main>
            </Container>
        </>
    )
})

export default App
