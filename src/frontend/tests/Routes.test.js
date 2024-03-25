import { render } from '@testing-library/react';
import Routes from '../components/Routes';
import UserContext from '../components/UserContext';
import { currentUser } from './__testCommon';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <Routes signup={() => {}} login={() => {}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <Routes signup={() => {}} login={() => {}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});






