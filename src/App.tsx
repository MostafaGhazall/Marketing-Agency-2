import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import OrderNow from "./pages/OrderNow";
import ReelDetail from "./pages/ReelDetail";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/order" element={<OrderNow />} />
        <Route path="/reel/:slug" element={<ReelDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
