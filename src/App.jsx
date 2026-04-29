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
  <div style={{ padding: 20 }}>
    <h1>Smart Bill Splitter</h1>

    {/* Add person input */}
    <input
      type="text"
      placeholder="Enter name and press Enter"
      onKeyDown={e => {
        if (e.key === "Enter" && e.target.value.trim()) {
          dispatch({
            type: "ADD_PERSON",
            payload: e.target.value
          });
          e.target.value = "";
        }
      }}
    />

    <h2>People</h2>
    {state.people.map(p => (
      <div key={p.id}>{p.name}</div>
    ))}

    {/* 👇 THIS IS WHERE IT GOES */}
    <BillTable
      items={state.items}
      people={state.people}
      dispatch={dispatch}
    />
<BillTable
  items={state.items}
  people={state.people}
  dispatch={dispatch}
/>

<RuleSelector state={state} dispatch={dispatch} />
 <h2>Per Person Breakdown</h2>

{state.people.map(person => {
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
);
}