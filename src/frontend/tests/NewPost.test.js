import { render } from '@testing-library/react';
import NewPost from '../components/NewPost';
import UserContext from '../components/UserContext';
import { currentUser } from './__testCommon';

test('renders without crashing', () => {
    render(
        <UserContext.Provider value={{currentUser:currentUser}}>
            <NewPost />
        </UserContext.Provider>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <UserContext.Provider value={{currentUser:currentUser}}>
            <NewPost />
        </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});






