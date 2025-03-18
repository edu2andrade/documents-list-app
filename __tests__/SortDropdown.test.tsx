import { render, screen, fireEvent } from '@testing-library/react-native';
import { SortDropdown, SortOption } from '@/components/SortDropdown';

// The Ionicons component is mocked globally in jest.setup.js

describe('SortDropdown', () => {
  const mockOnSortChange = jest.fn();
  const defaultSort: SortOption = { label: 'Created (Oldest first)', value: 'createdAt_asc' };

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  test('should render with sort by text', () => {
    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={defaultSort} />);

    expect(screen.getByText('Sort by')).toBeTruthy();
  });

  test('should open modal when dropdown is clicked', () => {
    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={defaultSort} />);

    // Modal should not be visible initially
    expect(screen.queryByText('Created (Oldest first)')).toBeNull();
    expect(screen.queryByText('Created (Newest first)')).toBeNull();

    // Click the dropdown button
    const dropdownButton = screen.getByText('Sort by').parent;
    fireEvent.press(dropdownButton);

    // Modal should now be visible with sort options
    expect(screen.getByText('Created (Oldest first)')).toBeTruthy();
    expect(screen.getByText('Created (Newest first)')).toBeTruthy();
  });

  test('should call onSortChange when a sort option is selected', () => {
    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={defaultSort} />);

    // Open the dropdown
    const dropdownButton = screen.getByText('Sort by').parent;
    fireEvent.press(dropdownButton);

    // Select the second option (newest first)
    const newestOption = screen.getByText('Created (Newest first)');
    fireEvent.press(newestOption);

    // Check that onSortChange was called with the correct option
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith({
      label: 'Created (Newest first)',
      value: 'createdAt_desc',
    });
  });

  test('should close modal after selecting an option', () => {
    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={defaultSort} />);

    // Open the dropdown
    const dropdownButton = screen.getByText('Sort by').parent;
    fireEvent.press(dropdownButton);

    // Verify modal is open
    expect(screen.getByText('Created (Newest first)')).toBeTruthy();

    // Select an option
    const newestOption = screen.getByText('Created (Newest first)');
    fireEvent.press(newestOption);

    // Modal should be closed
    expect(screen.queryByText('Created (Newest first)')).toBeNull();
  });

  test('should highlight the currently selected sort option', () => {
    // Start with newest first as current sort
    const newestFirstSort: SortOption = { label: 'Created (Newest first)', value: 'createdAt_desc' };

    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={newestFirstSort} />);

    // Open the dropdown
    const dropdownButton = screen.getByText('Sort by').parent;
    fireEvent.press(dropdownButton);

    // Get the option items directly using testIDs
    const oldestOptionItem = screen.getByTestId('sort-option-createdAt_asc');
    const newestOptionItem = screen.getByTestId('sort-option-createdAt_desc');

    // Verify both options are visible
    expect(screen.getByText('Created (Oldest first)')).toBeTruthy();
    expect(screen.getByText('Created (Newest first)')).toBeTruthy();

    // The newest option should have the selected style with backgroundColor: '#f0f0f0'
    expect(newestOptionItem.props.style).toMatchObject({
      backgroundColor: '#f0f0f0',
    });

    // The oldest option should not have the selected style
    expect(oldestOptionItem.props.style).not.toMatchObject({
      backgroundColor: '#f0f0f0',
    });
  });

  test('should close modal when clicking outside the modal content', () => {
    render(<SortDropdown onSortChange={mockOnSortChange} currentSort={defaultSort} />);

    // Open the dropdown
    const dropdownButton = screen.getByText('Sort by').parent;
    fireEvent.press(dropdownButton);

    // Verify modal is open
    expect(screen.getByText('Created (Newest first)')).toBeTruthy();

    // Click the modal overlay (outside the content)
    // We need to find the overlay which is the parent of the modal content
    const modalContent = screen.getByText('Created (Newest first)').parent.parent;
    const modalOverlay = modalContent.parent;
    fireEvent.press(modalOverlay);

    // Modal should be closed
    expect(screen.queryByText('Created (Newest first)')).toBeNull();
  });
});
