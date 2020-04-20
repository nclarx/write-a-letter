import { Button }             from '@material-ui/core'
import React                  from 'react'
import './App.css'
import Postcard               from './components/Postcard'
import useAuthState           from './hooks/UseAuthState'
import useObservable          from './hooks/UseObservable'
import logo                   from './logo.svg'
import { ImageMeta }          from './models/imageMeta'
import { environment }        from './react-app-env'
import AuthService            from './services/AuthService'
import { getImageCollection } from './services/ImageMetaService'

function App() {
    const auth = useAuthState()
    const postcards = useObservable<ImageMeta[]>(
        getImageCollection(environment.postcardsPath)
    )

    const handleLogin = () => {
        AuthService.login()
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
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Button onClick={() => handleLogin()} variant={'outlined'}>
                    Login
                </Button>
                {
                    auth && renderCardList()
                }
                <p>
                    Edit <code> src/App.tsx</code>
                    and save to reload.
                </p>
                < a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn
                    React
                </a>
            </header>
        </div>
    )
}

export default App
