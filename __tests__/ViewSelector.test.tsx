import { render, screen, fireEvent } from '@testing-library/react-native';
import { ViewSelector } from '@/components/ViewSelector';

// The Ionicons component is mocked globally in jest.setup.js

describe('ViewSelector', () => {
  test('should render with testID', () => {
    render(<ViewSelector toggleView={() => {}} viewState="list" />);

    expect(screen.getByTestId('view-selector')).toBeTruthy();
  });

  test('should show list icon with blue color when in list view', () => {
    render(<ViewSelector toggleView={() => {}} viewState="list" />);

    const listIcon = screen.getByTestId('icon-list-outline');
    const gridIcon = screen.getByTestId('icon-grid-outline');

    // Check the hidden text content that contains our color information
    expect(listIcon.findByType('Text').props.children).toContain('color:#3e82f3'); // Blue color for active state
    expect(gridIcon.findByType('Text').props.children).toContain('color:black'); // Black color for inactive state
  });

  test('should show grid icon with blue color when in grid view', () => {
    render(<ViewSelector toggleView={() => {}} viewState="grid" />);

    const listIcon = screen.getByTestId('icon-list-outline');
    const gridIcon = screen.getByTestId('icon-grid-outline');

    // Check the hidden text content that contains our color information
    expect(listIcon.findByType('Text').props.children).toContain('color:black'); // Black color for inactive state
    expect(gridIcon.findByType('Text').props.children).toContain('color:#3e82f3'); // Blue color for active state
  });

  test('should call toggleView when pressed', () => {
    const toggleViewMock = jest.fn();
    render(<ViewSelector toggleView={toggleViewMock} viewState="list" />);

    const button = screen.getByTestId('view-selector');
    fireEvent.press(button);

    expect(toggleViewMock).toHaveBeenCalledTimes(1);
  });

  test('should render different views based on viewState', () => {
    // Check that the component renders differently for different states
    const { rerender, toJSON: listViewJSON } = render(<ViewSelector toggleView={() => {}} viewState="list" />);

    // Store the list view snapshot
    const listViewSnapshot = listViewJSON();

    // Rerender with grid view
    rerender(<ViewSelector toggleView={() => {}} viewState="grid" />);

    // Store the grid view snapshot
    const gridViewSnapshot = listViewJSON();

    // The snapshots should be different because the component renders differently
    // based on the viewState
    expect(listViewSnapshot).not.toEqual(gridViewSnapshot);
  });
});
