import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Redux store
import store from "../redux/store";

// layout components
import Navbar from "./layout/Navbar/Navbar";
import Alert from "./layout/Alert";
import Footer from "./layout/Footer/Footer";

// pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Dropdown/Profile";
import Settings from "./pages/Dropdown/Settings";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers/Offers";
import Request from "./pages/Requests/Request";
import Requests from "./pages/Dropdown/Requests/requests";
import Budget from "./pages/Dropdown/Budget/budget";
import Users from "./pages/Dropdown/users/users";
import Programme from "./pages/Programme/Programme";
import ProgrammeAdmin from "./pages/Programme/ProgrammeAdmin";
import OffersAdmin from "./pages/Offers/OffersAdmin";
import Notification from "./pages/Dropdown/Notification/Notification";
import Meeting from "./pages/Dropdown/Meetings/meeting";
import AddMeeting from "./pages/Dropdown/Meetings/addMeeting";
import MyRequests from "./pages/Dropdown/MyRequests/MyRequests";
import Contact from "./pages/Contact/contact";
// Routes
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="app">
          <Route path="/" component={Navbar} />
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <AdminRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/u/:username" component={Profile} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/request" component={Request} />
            <PrivateRoute exact path="/notification" component={Notification} />
            <PrivateRoute exact path="/myrequests" component={MyRequests} />
            <AdminRoute exact path="/pending" component={Requests} />
            <AdminRoute exact path="/users" component={Users} />
            <AdminRoute exact path="/budget" component={Budget} />
            <AdminRoute exact path="/meeting" component={Meeting} />
            <AdminRoute exact path="/add-meeting" component={AddMeeting} />
            <AdminRoute
              exact
              path="/programmeAdmin"
              component={ProgrammeAdmin}
            />
            <AdminRoute exact path="/offersAdmin" component={OffersAdmin} />
            <Route exact path="/" component={Home} />
            <Route exact path="/offers" component={Offers} />
            <Route exact path="/programme" component={Programme} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
