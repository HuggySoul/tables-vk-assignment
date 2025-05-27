import st from "./app.module.css";
import { Table } from "./features/table/ui/table";

function App() {
  return (
    <>
      <header className={st.appHeader}>
        <h1 className={st.appTitle}>Таблица с отзывами</h1>
      </header>
      <main>
        <Table></Table>
      </main>
    </>
  );
}

export default App;
