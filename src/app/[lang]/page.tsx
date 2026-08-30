import { HomeView } from "@/components/home-view";

// Titlul, descrierea și hreflang-ul paginii de start vin din layout-ul de
// limbă (canonical „/ro” sau „/en”), deci pagina n-are metadata proprie.
export default function Home() {
  return <HomeView />;
}
