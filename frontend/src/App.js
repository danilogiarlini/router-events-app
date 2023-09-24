// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetailPage";
import EventsPage, { loader as eventLoader } from "./pages/EventsPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import RootLayout from "./pages/layout/RootLayout";
import EventsLayout from "./pages/layout/EventsLayout";
import ErrorPage from "./pages/ErrorPage";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<ErrorPage />}
      children={[
        <Route index={true} element={<HomePage />} />,
        <Route
          path="events"
          element={<EventsLayout />}
          children={[
            <Route
              index={true}
              element={<EventsPage />}
              loader={eventLoader}
            />,
            <Route
              path=":eventid"
              id="event-detail"
              loader={eventDetailLoader}
              children={[
                <Route index={true} element={<EventDetailPage />} />,
                <Route path="edit" element={<EditEventPage />} />,
              ]}
            />,
            <Route path="new" element={<NewEventPage />} action={newEventAction}/>,
          ]}
        />,
      ]}
    />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;