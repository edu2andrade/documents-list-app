import { render, screen } from '@testing-library/react-native';
import { Input } from '@/components/Input';

describe('Input', () => {
  test('should render', () => {
    render(<Input label="Test" />);

    expect(screen.getByTestId('input')).toBeTruthy();
  });
});
