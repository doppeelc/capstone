import { render } from '@testing-library/react';
import App from '../components/App';

test('renders without crashing', () => {
    render(<App />);
});

test('matches the snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
});






