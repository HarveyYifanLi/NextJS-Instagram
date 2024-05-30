import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'FinGuard',
    description: 'AI-powered compliance detection'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav /> 
                    {/* Along with the top-level Home page.jsx, all the new pages, i.e. defined by /app/my-new-page/page.jsx, are nested as children components below */}
                    {children}
                </main>
            </Provider>
        </body>
  </html>
  )
}

export default RootLayout