import { render } from '@testing-library/react';
import NavBar from '../components/NavBar';
import UserContext from '../components/UserContext';
import { currentUser } from './__testCommon';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <NavBar logout={() => {return "logout"}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:{currentUser}}}>
                <NavBar logout={() => {return "logout"}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

test('renders properly with no user', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:{loaded:true, data:null}}}>
                <NavBar logout={() => {return "logout"}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );

    expect(getByTestId("withoutUser")).toBeInTheDocument();
});

test('renders properly with user', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <NavBar logout={() => {return "logout"}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );

    expect(getByTestId("withUser")).toBeInTheDocument();
});






