import { createBrowserRouter } from "react-router-dom";
import Task from "./Components/Task";
import TaskList from "./Components/TaskList";
import App from "./Components/App";
import DeleteTask from "./Components/Delete";
import Update from "./Components/Update";




const customRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            {
                path: '/task',
                element: <Task />
            }, {
                path: '/tasklist',
                element: <TaskList />
            },
            {
                path: '/update/:id',
                element: <Update />
            },
            {
                
                path: '/delete/:id',
                element: <DeleteTask/>
            },

          
        ]
    },
]);
export default customRouter;