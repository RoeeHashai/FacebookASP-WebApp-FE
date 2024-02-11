import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
describe('Menu Component', () => {
  test('renders menu sidebar buttons', () => {
    // Mock user data
    const user = {
      name: 'John Doe',
      image: '/path/to/profile/image.jpg',
    };

    // Render the Menu component with mock user data
    const { getByText } = render(
      <MemoryRouter>
        <Menu user={user} darkMode={false} />
      </MemoryRouter>
    );

    // Check if the sidebar buttons are rendered
    expect(getByText('Friends')).toBeInTheDocument();
    expect(getByText('Feeds')).toBeInTheDocument();
    expect(getByText('Memories')).toBeInTheDocument();
    expect(getByText('Saved')).toBeInTheDocument();
    expect(getByText('Groups')).toBeInTheDocument();
    expect(getByText('Video')).toBeInTheDocument();
    expect(getByText('Marketplace')).toBeInTheDocument();
    expect(getByText('Events')).toBeInTheDocument();
    expect(getByText('Messenger')).toBeInTheDocument();
  });
});
