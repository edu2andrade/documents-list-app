import { render, screen, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/Input';

describe('Input', () => {
  test('should render input with testID', () => {
    render(<Input label="Test" />);

    expect(screen.getByTestId('input')).toBeTruthy();
  });

  test('should display the correct label', () => {
    render(<Input label="Username" />);

    expect(screen.getByText('Username')).toBeTruthy();
  });

  test('should display placeholder when provided', () => {
    render(<Input label="Email" placeholder="Enter your email" />);

    const input = screen.getByTestId('input');
    expect(input.props.placeholder).toBe('Enter your email');
  });

  test('should handle text input changes', () => {
    const onChangeTextMock = jest.fn();
    render(<Input label="Password" onChangeText={onChangeTextMock} />);

    const input = screen.getByTestId('input');
    fireEvent.changeText(input, 'test123');

    expect(onChangeTextMock).toHaveBeenCalledWith('test123');
  });

  test('should forward additional props to TextInput', () => {
    render(
      <Input 
        label="Secret" 
        secureTextEntry={true} 
        maxLength={10} 
      />
    );

    const input = screen.getByTestId('input');
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.maxLength).toBe(10);
  });
});
