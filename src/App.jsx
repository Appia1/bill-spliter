import { useReducer } from "react";
import { billReducer, initialState } from "./reducer/billReducer";
import RuleSelector from "./components/RuleSelector";
import BillTable from "./components/BillTable";
import PersonCard from "./components/PersonCard";
import {
  splitItems,
  applyTax,
  applyTip,
  calculateTotals,
  applyRounding
} from "./lib/calc";

export default function App() {
  const [state, dispatch] = useReducer(billReducer, initialState);

  const subtotals = splitItems(state.items, state.people);
  const taxMap = applyTax(subtotals, state.taxRate);
  const tipMap = applyTip(subtotals, taxMap, state.tipRate, state.tipOn);
  const totals = calculateTotals(subtotals, taxMap, tipMap);
  const finalTotals = applyRounding(totals, state.roundingRule);

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title}>Smart Bill Splitter</h1>
        <p style={styles.subtitle}>
          Split bills fairly and intelligently
        </p>
      </header>

      {/* ADD PERSON */}
      <div style={styles.card}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter name and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              dispatch({
                type: "ADD_PERSON",
                payload: e.target.value
              });
              e.target.value = "";
            }
          }}
        />

        <div style={styles.peopleList}>
          {state.people.map((p) => (
            <span key={p.id} style={styles.badge}>
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* BILL TABLE */}
      <div style={styles.card}>
        <BillTable
          items={state.items}
          people={state.people}
          dispatch={dispatch}
        />
      </div>

      {/* RULE SELECTOR */}
      <div style={styles.card}>
        <RuleSelector state={state} dispatch={dispatch} />
      </div>

      {/* RESULTS */}
      <h2 style={styles.sectionTitle}>Per Person Breakdown</h2>

      <div style={styles.grid}>
        {state.people.map((person) => {
          const data = finalTotals[person.id];
          if (!data) return null;

          return (
            <PersonCard
              key={person.id}
              person={person}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
}

/* =======================
   PROFESSIONAL STYLES
======================= */
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20,
    background: "#f6f8fb",
    minHeight: "100vh"
  },

  header: {
    textAlign: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 34,
    margin: 0,
    color: "#111827",
    fontWeight: "bold"
  },

  subtitle: {
    marginTop: 5,
    color: "#6b7280",
    fontSize: 14
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    marginBottom: 10
  },

  peopleList: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  },

  badge: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: "#111827",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12
  }
};