import { render } from '@testing-library/react';
import ProfilePage from '../components/ProfilePage';
import UserContext from '../components/UserContext';
import { currentUser } from './__testCommon';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <ProfilePage />
            </UserContext.Provider>
        </BrowserRouter>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <ProfilePage />
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

test('renders the form', () => {
    const { getByPlaceholderText } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <ProfilePage />
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Display Name")).toBeInTheDocument();
});






