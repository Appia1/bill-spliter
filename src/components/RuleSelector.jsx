export default function RuleSelector({ state, dispatch }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 15,
        marginTop: 20,
        borderRadius: 8
      }}
    >
      <h3>Rules</h3>

      {/* TIP RATE */}
      <div style={{ marginBottom: 10 }}>
        <label>Tip Rate (%): </label>
        <input
          type="number"
          value={state.tipRate * 100}
          onChange={e =>
            dispatch({
              type: "SET_TIP",
              payload: Number(e.target.value) / 100
            })
          }
        />
      </div>

      {/* TIP MODE */}
      <div style={{ marginBottom: 10 }}>
        <label>Tip Calculation: </label>

        <select
          value={state.tipOn}
          onChange={e =>
            dispatch({
              type: "SET_TIP_MODE",
              payload: e.target.value
            })
          }
        >
          <option value="pre-tax">Pre-tax</option>
          <option value="post-tax">Post-tax</option>
        </select>
      </div>

      {/* ROUNDING RULE */}
      <div>
        <label>Rounding Rule: </label>

        <select
          value={state.roundingRule}
          onChange={e =>
            dispatch({
              type: "SET_ROUNDING",
              payload: e.target.value
            })
          }
        >
          <option value="LAST_PERSON">Last person absorbs difference</option>
          <option value="EVEN">Even distribution (future logic)</option>
        </select>
      </div>
    </div>
  );
}