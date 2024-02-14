import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../../components/menu/Menu';

describe('Menu Component', () => { // Test 1/5: Simple test
    test('renders menu sidebar buttons', () => {
        const user = {
            "id": 1,
            "name": "Roee Hashai",
            "email": "roee.hashai@gmail.com",
            "password": "1111",
            "image": "/profile-pictures/roee_hashai.jpg"
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
