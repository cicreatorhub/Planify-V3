import Stats from "../components/dashboard/Stats";
import Progress from "../components/dashboard/Progress";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";


export default function Home() {
  return (
    <div className="home-page">

      <section className="hero">

        <div>

          <h2>Dashboard</h2>

          <p>
            Organize your work, stay productive and
            achieve your goals.
          </p>

        </div>

      </section>

      <Stats />

      <Progress />
      
    <ProductivityChart />
      
      <TaskForm />

      <TaskList />

    </div>
  );
}
