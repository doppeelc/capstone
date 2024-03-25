import { render } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

test('renders without crashing', () => {
    render(<LoginForm />);
});

test('matches the snapshot', () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
});

test('renders the form empty', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    expect(getByPlaceholderText("username")).toBeInTheDocument();
    expect(getByPlaceholderText("username")).toBeEmptyDOMElement();
    expect(getByPlaceholderText("password")).toBeInTheDocument();
    expect(getByPlaceholderText("password")).toBeEmptyDOMElement();
});






