import Todo from "./Pages/Todo";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Todo />
      <ToastContainer />
    </div>
  );
};

export default App;


