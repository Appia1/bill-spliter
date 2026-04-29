export const initialState = {
  people: [],
  items: [],
  taxRate: 0.075,
  tipRate: 0.1,
  tipOn: "post-tax",
  roundingRule: "LAST_PERSON"
};

export function billReducer(state, action) {
  switch (action.type) {

    case "ADD_PERSON":
      return {
        ...state,
        people: [
          ...state.people,
          { id: Date.now(), name: action.payload }
        ]
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            name: "",
            price: 0,
            assignedTo: "all"
          }
        ]
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        )
      };

    // 👇 THIS is where your code belongs
    case "ASSIGN_ITEM":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, assignedTo: action.payload.assignedTo }
            : item
        )
      };

    case "SET_TAX":
      return { ...state, taxRate: action.payload };

    case "SET_TIP":
      return { ...state, tipRate: action.payload };

    case "SET_TIP_MODE":
      return { ...state, tipOn: action.payload };

    case "SET_ROUNDING":
      return { ...state, roundingRule: action.payload };

    default:
      return state;
  }
}