import { useState, useEffect } from "react";
import axios from "axios";

// viteでの環境変数の呼び出し
const token = import.meta.env.VITE_DRF_USER_TOKEN;

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setTasks(res.data));
  }, []);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} id:{task.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrfApiFetch;
