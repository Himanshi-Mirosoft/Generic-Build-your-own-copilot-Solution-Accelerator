import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
import { BrowserRouter as Router } from 'react-router-dom';
import FeatureCard from './FeatureCard';  // Do not import FeatureCardProps here
import { debug } from 'console';


// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Helper function to render the FeatureCard
const renderFeatureCard = (props: React.ComponentProps<typeof FeatureCard>) => {
  return render(
    <Router>
      <FeatureCard {...props} />
    </Router>
  );
};

describe('FeatureCard', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    // Clear all mock calls before each test
    mockNavigate.mockClear();
  });

  const props = {
    icon: <svg>Icon</svg>, // A simple mock of an icon
    title: 'Feature Title',
    description: 'Feature description goes here.',
    urlSuffix: '/feature-url',
  };

  test('renders correctly with the provided props', () => {
    const { getByText, getByRole } = renderFeatureCard(props);
    
    // Check if title and description are rendered correctly
    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();

    // Check if the icon is rendered (if it's in the SVG)
    expect(getByText('Icon')).toBeInTheDocument(); // assuming the icon is an SVG
  });
  

  test('handles missing props gracefully', () => {
    // Test with missing description or title
    const { getByText, queryByText } = renderFeatureCard({
        icon: props.icon,
        urlSuffix: props.urlSuffix,
        title: "Partial Card",
        description: ''
    });

    // Ensure it renders even if description is missing
    expect(getByText('Partial Card')).toBeInTheDocument();
    expect(queryByText('Feature description goes here.')).toBeNull();
  });

  test('renders the correct icon', () => {
    const { container } = renderFeatureCard(props);

    // Ensure the icon is correctly rendered (in this case, the <svg> element)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
