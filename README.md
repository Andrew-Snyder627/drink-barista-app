# 🍹 Drink Barista App

## Description

A single-page application for “The Daily Brew & Co.” barista-style drink shop.

**Features:**

- Home page with store information
- Shop page with searchable, responsive grid of drinks
- Admin portal for creating and editing drink entries

## Component Architecture

```text
src/
├── api/
│     └── drinks.js            # fetch/post/patch wrappers using native fetch
├── components/
│     ├── NavBar/
│     │     └── NavBar.jsx     # navigation links
│     ├── StoreBanner/
│     │     ├── StoreBanner.jsx  # home page header, fetches store_info
│     │     └── StoreBanner.module.css
│     ├── ShopPage/
│     │     ├── ShopPage.jsx     # fetches drinks, handles search
│     │     └── ShopPage.module.css
│     ├── FilterSidebar/
│     │     ├── FilterSidebar.jsx# search input component
│     │     └── FilterSidebar.module.css
│     ├── ProductGrid/
│     │     ├── ProductGrid.jsx  # grid layout
│     │     └── ProductGrid.module.css
│     ├── ProductCard/
│     │     ├── ProductCard.jsx  # individual drink card
│     │     └── ProductCard.module.css
│     ├── AdminPortal/
│     │     ├── AdminPortal.jsx  # renders create & edit forms
│     │     └── AdminPortal.module.css
│     ├── ProductForm/
│     │     ├── ProductForm.jsx   # create-drink form
│     │     └── ProductForm.module.css
│     ├── EditDrinkForm/
│     │     ├── EditDrinkForm.jsx # edit-drink form
│     │     └── EditDrinkForm.module.css
│     ├── TextInput/
│     └── SubmitButton/
└── hooks/
      ├── useFetch.js           # custom fetch hook (data, loading, error)
      └── useFormFields.js      # form-state management hook
```

## Tech Stack

- **Build & Bundler:** Vite
- **Frontend:** React, React Router
- **Styling:** CSS Modules, Material-UI (MUI)
- **Mock API:** json-server
- **Testing:** Vitest, React Testing Library

## Getting Started

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd drink-barista-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the mock API server**

   ```bash
   npm run server
   # serves db.json at http://localhost:4000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # open http://localhost:5173
   ```

5. **Execute all tests**
   ```bash
   npm test
   ```

## Testing Challenges & Solutions

1. **Hanging on real HTTP calls**

   - **Challenge:** `useFetch` issues a real `fetch()` that never resolves in tests.
   - **Solution:** Stub `global.fetch` in tests to return mock JSON for specific endpoints.

2. **Immutable module exports**

   - **Challenge:** Directly reassigning `api.updateDrink` caused “only a getter” errors.
   - **Solution:** Use `vi.spyOn(api, 'updateDrink')` to mock the function without reassigning the export.

3. **Hook-mock ordering**

   - **Challenge:** Mocking the hook after importing the component meant the real hook ran first and tests hung on “Loading.”
   - **Solution:** Hoist `vi.mock('../hooks/useFetch')` (or `vi.spyOn(fetchHook, 'default')`) to the top of test files, before component imports.

4. **Asynchronous state updates**
   - **Challenge:** Asserting input values immediately sometimes occurred before React state settled.
   - **Solution:** Use RTL’s `findBy…` queries and `waitFor()` to await DOM updates before assertions.

## Screenshots

### Home Page

![Home Page Screenshot](./src/assets/home-page.png)

### Shop Page

![Shop Page Screenshot](./src/assets/shop-page.png)

### Admin Portal

![Admin Portal Screenshot](./src/assets/admin-page.png)
