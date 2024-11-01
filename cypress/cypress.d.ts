// cypress.d.ts
declare namespace Cypress {
  interface Cookies {
    preserveOnce(...names: string[]): void;
  }
}