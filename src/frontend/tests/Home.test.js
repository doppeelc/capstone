import { render } from '@testing-library/react';
import Home from '../components/Home';

test('renders without crashing', () => {
    render(<Home />);
});

test('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
});






