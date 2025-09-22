import { render, screen } from '@testing-library/react';
import Sector from '../Sector';

describe('Sector Component', () => {
  const mockProps = {
    sector_id: '1',
    name: 'Сектор-1',
    percentages: 25,
    color: '#ff0000',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct sector name', () => {
    render(<Sector {...mockProps} />);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('displays the correct percentage value', () => {
    render(<Sector {...mockProps} />);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('renders SVG circle with correct color', () => {
    render(<Sector {...mockProps} />);

    expect(screen.getByRole('img')).toHaveAttribute('fill', '#ff0000');
  });
});
