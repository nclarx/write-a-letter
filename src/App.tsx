import { Button }             from '@material-ui/core'
import React                  from 'react'
import './App.css'
import Postcard               from './components/Postcard'
import useAuthState           from './hooks/UseAuthState'
import useObservable          from './hooks/UseObservable'
import { ImageMeta }          from './models/imageMeta'
import AuthService            from './services/AuthService'
import { getImageCollection } from './services/ImageMetaService'

function App() {
    const auth = useAuthState()
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
                        <div>
                            <Postcard postcard={card} />
                        </div>
                    ))
                }
            </ul>
        </section>
    )

    return (
        <main className="App">
            <Button onClick={() => handleLogout()} variant={'outlined'}>
                Logout
            </Button>
            <Button onClick={() => handleLogin()} variant={'outlined'}>
                Login
            </Button>
            {
                auth && renderCardList()
            }
        </main>
    )
}

export default App
