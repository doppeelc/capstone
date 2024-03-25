import { render } from '@testing-library/react';
import Post from '../components/Post';
import UserContext from '../components/UserContext';
import { currentUser, testPost } from './__testCommon';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser}}>
                <Post post={testPost} isLiked={(id) => {return false}} />
            </UserContext.Provider>
        </BrowserRouter>
    );
});

test('matches the snapshot', () => {
    const { asFragment } = render(
        <BrowserRouter>
            <UserContext.Provider value={{currentUser}}>
                <Post post={testPost} isLiked={(id) => {return false}} />
            </UserContext.Provider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});






