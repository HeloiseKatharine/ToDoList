import Header from "../../layout/Header";
import TaskList from "../../layout/TaskList";

function Home() {
  console.log("teste");
  return (
    <div className="Home">
      <Header />
      <TaskList />
    </div>
  );
}

export default Home;
