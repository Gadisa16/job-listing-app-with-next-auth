import { Login } from './pages/login.cy';
import { Navigate } from './pages/navigate.cy';

const navigate = new Navigate().navigate;
const login = new Login().login;

describe('login and navigation', () => {
  beforeEach(() => {
    // Use cy.session() to manage session data
    cy.session('login', () => {
      cy.visit('/');
      login('q9mgb@livinitlarge.net', 'city123');
    });
  });

  it('navigate', () => {
    cy.visit('/');
    navigate();
  });
});