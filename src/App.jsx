import "./App.css";
import imageDark from "./images/todo-dark.png";
import iconSun from "./images/icon-sun.svg";
import iconCross from "./images/icon-cross.svg";
import iconMoon from "./images/icon-moon.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [iconStar, setIconStar] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const deleteTodo = async (id) => {
    const response = await axios.delete(
      `https://todo-app-list-74x6.onrender.com/api/deletetodos/${id}`
    );
  };
  const deleteCompleted = async (active) => {
    const response = await axios.delete(
      `https://todo-app-list-74x6.onrender.com/api/dltcomp/${active}`
    );
  };

  const toggleTodo = async (id) => {
    const response = await axios.put(
      `https://todo-app-list-74x6.onrender.com/api/puttodo/${id}`
    );
  };

  const fetch = async () => {
    const response = await axios.get(
      "https://todo-app-list-74x6.onrender.com/api/gettodos"
    );
    setItems(response.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  function changeTheme() {
    setIconStar(!iconStar);
  }

  const forChange = (event) => {
    setNewItem(event.target.value);
  };

  const addItem = async () => {
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const response = await axios.post(
      "https://todo-app-list-74x6.onrender.com/api/posttodos",
      {
        value: newItem,
        active: iconStar,
      }
    );

    const item = {
      id: Math.random(),
      value: newItem,
      active: false,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  };

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function markButton(id) {
    const newArrays = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: !item.active,
        };
      }
      return item;
    });
    setItems(newArrays);
  }
  function filterAll() {
    setFilter("all");
  }

  function filterActive() {
    setFilter("active");
  }

  function completed() {
    setFilter("completed");
  }

  function clearCompleted() {
    const newArray = items.filter((item) => item.active === false);
    deleteCompleted();
    setItems(newArray);
  }

  function getVisibleItems() {
    switch (filter) {
      case "active":
        return items.filter((item) => !item.active);
      case "completed":
        return items.filter((item) => item.active);

      default:
        return items;
    }
  }
  const visibleItems = getVisibleItems();
  const visibleItemsLength = visibleItems.length;

  return (
    <section className={`back ${iconStar ? "back-light" : "back"}`}>
      <section className="main-section">
        <div className="header-div">
          <img className="todo-dark" src={imageDark} alt="Todo banner" />
          <img
            className="icon-sun"
            src={iconStar ? iconMoon : iconSun}
            alt="sun icon"
            onClick={changeTheme}
          />
        </div>

        <div
          className="new-todo"
          style={{ backgroundColor: iconStar ? "white" : null }}
        >
          <button
            onClick={addItem}
            className="new-todo-button"
            style={{
              background: iconStar ? "white" : null,
            }}
          ></button>
          <input
            className="new-todo-input"
            type="text"
            placeholder="Create new todo"
            style={{ color: iconStar ? "#393A4B" : null }}
            value={newItem}
            onChange={forChange}
          />
        </div>
        <div
          className="todo-list"
          style={{ backgroundColor: iconStar ? "white" : null }}
        >
          {getVisibleItems().map((item) => {
            return (
              <div className="list-item" key={item.id}>
                <div className="main-part">
                  <div className="left-part">
                    <div
                      className={`ground ${item.active ? "groundBack" : ""}`}
                    >
                      <button
                        onClick={() => {
                          markButton(item.id);
                          toggleTodo(item.id);
                        }}
                        className={`mark ${item.active ? "marked" : ""}`}
                      ></button>
                    </div>
                    <p
                      className={`todo-text ${
                        item.active ? "todo-text-through " : ""
                      }`}
                      style={{
                        color:
                          iconStar && item.active
                            ? "#D1D2DA"
                            : iconStar
                            ? "#494C6B"
                            : "",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                  <img
                    onClick={() => {
                      deleteTodo(item.id);
                      deleteItem(item.id);
                    }}
                    src={iconCross}
                    className="close-button"
                    alt="close button"
                  />
                </div>
                <div
                  className="line"
                  style={{ background: iconStar ? "#E3E4F1" : null }}
                ></div>
              </div>
            );
          })}

          <div
            className="for-count"
            style={{ backgroundColor: iconStar ? "white" : null }}
          >
            <p className="items-left"> {visibleItemsLength} items left</p>
            <div className="filter-options">
              <button
                onClick={filterAll}
                className={`filter-status ${
                  filter === "all" ? "filter-status-active " : ""
                }`}
              >
                All
              </button>
              <button
                onClick={filterActive}
                className={`filter-status ${
                  filter === "active" ? "filter-status-active " : ""
                }`}
              >
                Active
              </button>
              <button
                onClick={completed}
                className={`filter-status ${
                  filter === "completed" ? "filter-status-active " : ""
                }`}
              >
                Completed
              </button>
            </div>
            <button onClick={clearCompleted} className="clear-status">
              Clear Completed
            </button>
          </div>
        </div>

        <div
          className="filter-div"
          style={{ background: iconStar ? "white" : null }}
        >
          <button
            onClick={filterAll}
            className={`filter-status ${
              filter === "all" ? "filter-status-active " : ""
            }`}
          >
            All
          </button>
          <button
            onClick={filterActive}
            className={`filter-status ${
              filter === "active" ? "filter-status-active " : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={completed}
            className={`filter-status ${
              filter === "completed" ? "filter-status-active " : ""
            }`}
          >
            Completed
          </button>
        </div>
        <p className="footer-text" style={{ color: iconStar ? "#9495A5" : "" }}>
          Drag and drop to reorder list
        </p>
      </section>
    </section>
  );
}

export default App;
