import { ChangeEventHandler, ReactNode, useState } from "react";
import Math from "./components/Math";

export default function App() {
  const [mode, setMode] = useState("firstLast");
  return (
    <div className="flex justify-center">
      <main className="w-[65ch]">
        <fieldset>
          <RadioButton
            group="mode"
            id="firstLast"
            checked={mode === "firstLast"}
            label="значення першого та останнього членів арифметичної прогресії"
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="firstStep"
            checked={mode === "firstStep"}
            label="значення першого члена арифметичної прогресії і крок прогресії"
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="oneStep"
            checked={mode === "oneStep"}
            label="значення одного з членів арифметичної прогресії і крок прогресії"
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="two"
            checked={mode === "two"}
            label="значення двох членів арифметичної прогресії"
            onChange={(e) => setMode(e.target.value)}
          />
        </fieldset>
        {mode}
        <Math text={"2+2=4"} />
      </main>
    </div>
  );
}

function RadioButton({
  group,
  id,
  checked,
  onChange,
  label,
}: {
  group: string;
  id: string;
  checked: boolean;
  label: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <input
        type="radio"
        name={group}
        value={id}
        id={id}
        className="align-middle"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
