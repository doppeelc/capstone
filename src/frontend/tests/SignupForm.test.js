import { render } from '@testing-library/react';
import SignupForm from '../components/SignupForm';
import UserContext from '../components/UserContext';
import { currentUser } from './__testCommon';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <SignupForm signup={() => {}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser:currentUser}}>
                <SignupForm signup={() => {}}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

test('renders the form empty', () => {
    const { getByPlaceholderText } = render(<SignupForm />);
    expect(getByPlaceholderText("username")).toBeInTheDocument();
    expect(getByPlaceholderText("username")).toBeEmptyDOMElement();
    expect(getByPlaceholderText("password")).toBeInTheDocument();
    expect(getByPlaceholderText("password")).toBeEmptyDOMElement();
    expect(getByPlaceholderText("email")).toBeInTheDocument();
    expect(getByPlaceholderText("email")).toBeEmptyDOMElement();
    expect(getByPlaceholderText("display name")).toBeInTheDocument();
    expect(getByPlaceholderText("display name")).toBeEmptyDOMElement();
});






