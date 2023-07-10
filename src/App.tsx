import { ChangeEventHandler, ReactNode, useState } from "react";
import { z } from "zod";
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
        {mode === "firstLast" && <FirstLastForm />}
      </main>
    </div>
  );
}

const firstLastSchema = z.object({
  n: z
    .string()
    .regex(/[0-9]+/)
    .transform(Number),
  first: z
    .string()
    .regex(/[0-9]+([.,][0-9]+)?/)
    .transform(Number),
  last: z
    .string()
    .regex(/[0-9]+([.,][0-9]+)?/)
    .transform(Number),
});

function FirstLastForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    first: "",
    last: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = firstLastSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;

  return (
    <form className="flex flex-col items-start">
      <NumberInput
        id="n"
        onChange={(e) => {
          setInputVars({ ...inputVars, n: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <NumberInput
        id="first"
        onChange={(e) => {
          setInputVars({ ...inputVars, first: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.first}
      />
      <NumberInput
        id="last"
        onChange={(e) => {
          setInputVars({ ...inputVars, last: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.last}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Submit
      </button>
      {showResult && variables !== undefined && (
        <>Сума: {((variables.first + variables.last) / 2) * variables.n}</>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

function NumberInput({
  value,
  onChange,
  integer = false,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  integer?: boolean;
}) {
  return (
    <input
      type="number"
      onChange={onChange}
      value={value}
      step={integer ? 1 : "any"}
      className="border-2 border-gray-400 rounded-lg min-w-0"
      required
    />
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
