import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import React from "react";

const GENDERS = ["Male", "Female"];

type Voter = {
  nic: string;
  fullname: string;
  dob: Date;
  gender: string;
  email: string;
};

const initialState: Voter = {
  nic: "",
  fullname: "",
  dob: new Date(),
  gender: GENDERS[0],
  email: "",
};

type DispatchActionType = { type: string; payload: Partial<Voter> };

function reducer(state: Voter, action: DispatchActionType): Voter {
  switch (action.type) {
    case "setNic":
      if (action.payload.nic === undefined) {
        throw new Error("NIC cannot be undefined");
      }
      return { ...state, nic: action.payload.nic };
    case "setFullName":
      if (action.payload.fullname === undefined) {
        throw new Error("Full name cannot be undefined");
      }
      return { ...state, fullname: action.payload.fullname };
    case "setDob":
      return { ...state, dob: action.payload.dob! };
    case "setGender":
      return { ...state, gender: action.payload.gender! };
    case "setEmail":
      if (action.payload.email === undefined) {
        throw new Error("Email cannot be undefined");
      }
      return { ...state, email: action.payload.email };
    case "setVoterDetails":
      if (
        action.payload.nic &&
        action.payload.fullname &&
        action.payload.dob &&
        action.payload.gender &&
        action.payload.email
      ) {
        return {
          nic: action.payload.nic,
          fullname: action.payload.fullname,
          dob: action.payload.dob,
          gender: action.payload.gender,
          email: action.payload.email,
        };
      }
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

interface VoterContextInterface {
  state: Voter;
  dispatch: React.Dispatch<DispatchActionType>;
}

const VoterContext = createContext<VoterContextInterface>({
  state: initialState,
  dispatch: () => {
    console.warn(
      "Using default store provider. Make sure the Voter Store Provider is present in the tree.",
    );
  },
});

const VoterStoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <VoterContext.Provider value={{ state, dispatch }}>
      {children}
    </VoterContext.Provider>
  );
};

const useVoterStore = () => useContext(VoterContext);

export default Voter;
export { GENDERS, VoterStoreProvider, VoterContext, useVoterStore };
