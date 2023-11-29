import { Route, Routes, BrowserRouter } from 'react-router-dom'
import routes from 'constants/routes'
import { MetadataProvider } from 'context/useMetaData'

export const CustomRoute = ({ component: Component }) => <Component />

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <MetadataProvider>
                <Routes>
                    {routes.map((route, index) => {
                        const { component, path } = route
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <CustomRoute component={component} />
                                }
                            />
                        )
                    })}
                </Routes>
            </MetadataProvider>
        </BrowserRouter>
    )
}

export default AppRoutes
