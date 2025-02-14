import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const Root: React.FC = () => {

    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<MainPage />}/>
                    <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
        </Router>
        </Provider>
    )
}