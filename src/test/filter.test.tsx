import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '../components/common/filter';

describe('Filter Component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test('renders the filter button', () => {
    render(<Filter onFilterChange={mockOnFilterChange} />);
    const button = screen.getByTestId('filter-button');
    expect(button).toBeInTheDocument();
  });

  test('shows the dropdown when the button is clicked', () => {
    render(<Filter onFilterChange={mockOnFilterChange} />);

    const button = screen.getByTestId('filter-button');
    fireEvent.click(button);

    const dropdown = screen.getByTestId('location-dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  // test('renders all options in the dropdown', () => {
  //   render(<Filter onFilterChange={mockOnFilterChange} />);

  //   const button = screen.getByTestId('filter-button');
  //   fireEvent.click(button);

  //   const options = [
  //     'All',
  //     'Uptown',
  //     'Classroom',
  //     'Downtown',
  //     'Best Man',
  //     'Coleng Gazebo',
  //     'Colnas Gazebo',
  //     'Colmans Gazebo',
  //     'Football field/Pavilion',
  //     'Ekorupa & Sons',
  //     'Exceeding Grace Cafeteria',
  //     'Library',
  //     'Marque',
  //   ];

  //   options.forEach((option) => {
  //     const optionElement = screen.getByTestId(
  //       `location-option-${option.replace(/\s+/g, '-').toLowerCase()}`
  //     );
  //     expect(optionElement).toBeInTheDocument();
  //     expect(optionElement).toHaveTextContent(option);
  //   });
  // });

  // test('calls onFilterChange when an option is selected', () => {
  //   render(<Filter onFilterChange={mockOnFilterChange} />);

  //   const button = screen.getByTestId('filter-button');
  //   fireEvent.click(button);

  //   const optionElement = screen.getByTestId('location-option-uptown');
  //   fireEvent.click(optionElement);

  //   expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  //   expect(mockOnFilterChange).toHaveBeenCalledWith('Uptown');
  // });

  test('hides the dropdown when clicking outside', () => {
    render(<Filter onFilterChange={mockOnFilterChange} />);

    const button = screen.getByTestId('filter-button');
    fireEvent.click(button);

    const dropdown = screen.getByTestId('location-dropdown');
    expect(dropdown).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByTestId('location-dropdown')).not.toBeInTheDocument();
  });
});