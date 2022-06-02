import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const workoutState = atom({
  key: "workoutState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const startTimeState = atom({
  key: "startTimeState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
