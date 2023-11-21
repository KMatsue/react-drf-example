import { useState, useEffect } from "react";
import axios from "axios";

// viteでの環境変数の呼び出し
const token = import.meta.env.VITE_DRF_USER_TOKEN;

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setTasks(res.data));
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setSelectedTask(res.data));
  };

  const createTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setEditedTask({ id: "", title: "" });
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const contaierStyle = {
    border: "solid 2px #329eff",
    borderRadius: "20px",
    padding: "8px",
    margin: "8px",
  };

  return (
    <div>
      <div style={contaierStyle}>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} id:{task.id}
              <button type="button" onClick={() => deleteTask(task.id)}>
                <i className="fas fa-trash-alt"></i> Delete task
              </button>
            </li>
          ))}
        </ul>{" "}
      </div>
      <br />

      {/* CREATE */}
      <div style={contaierStyle}>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={(evt) => handleInputChange(evt)}
          placeholder="New task ?"
          required
        />
        <button onClick={() => createTask(editedTask)}>Create</button>
      </div>
      <br />

      {/* GET */}
      <div style={contaierStyle}>
        Set id <br />
        <input
          type="text"
          value={id}
          onChange={(evt) => {
            setId(evt.target.value);
          }}
        />
        <br />
        <button type="button" onClick={() => getTask()}>
          Get task
        </button>
        <h3>
          {selectedTask.title} {selectedTask.id}
        </h3>
      </div>
    </div>
  );
};

export default DrfApiFetch;
