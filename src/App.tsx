import { ChangeEventHandler, ReactNode, useState } from "react";
import { z } from "zod";

const integerRegex = /^-?[0-9]+$/;
const integerTransform = Number;

const floatRegex = /^-?[0-9]+([.,][0-9]+)?$/;
const floatTransform = (str: string) => {
  return Number(str.replace(",", "."));
};

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
        {mode === "firstStep" && <FirstStepForm />}
        {mode === "oneStep" && <OneStepForm />}
        {mode === "two" && <TwoForm />}
      </main>
    </div>
  );
}

const firstLastSchema = z.object({
  n: z.string().regex(integerRegex).transform(integerTransform),
  first: z.string().regex(floatRegex).transform(floatTransform),
  last: z.string().regex(floatRegex).transform(floatTransform),
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
        Порахувати
      </button>
      {showResult && variables !== undefined && (
        <>Сума: {((variables.first + variables.last) / 2) * variables.n}</>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const firstStepSchema = z.object({
  n: z.string().regex(integerRegex).transform(integerTransform),
  first: z.string().regex(floatRegex).transform(floatTransform),
  step: z.string().regex(floatRegex).transform(floatTransform),
});

function FirstStepForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    first: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = firstStepSchema.safeParse(inputVars);
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
        id="step"
        onChange={(e) => {
          setInputVars({ ...inputVars, step: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </button>
      {showResult && variables !== undefined && (
        <>
          Сума:{" "}
          {((2 * variables.first + (variables.n - 1) * variables.step) / 2) *
            variables.n}
        </>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const twoSchema = z.object({
  n: z.string().regex(integerRegex).transform(integerTransform),
  index: z.string().regex(integerRegex).transform(integerTransform),
  value: z.string().regex(floatRegex).transform(floatTransform),
  index2: z.string().regex(integerRegex).transform(integerTransform),
  value2: z.string().regex(floatRegex).transform(floatTransform),
});

function TwoForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    index: "",
    value: "",
    index2: "",
    value2: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = twoSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;
  const step = variables
    ? (variables.value - variables.value2) /
      (variables.index - variables.index2)
    : undefined;
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
        id="index"
        onChange={(e) => {
          setInputVars({ ...inputVars, index: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.index}
        integer
      />
      <NumberInput
        id="value"
        onChange={(e) => {
          setInputVars({ ...inputVars, value: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <NumberInput
        id="index2"
        onChange={(e) => {
          setInputVars({ ...inputVars, index2: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.index2}
        integer
      />
      <NumberInput
        id="value2"
        onChange={(e) => {
          setInputVars({ ...inputVars, value2: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value2}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </button>
      {showResult && variables !== undefined && step !== undefined && (
        <>
          Сума:{" "}
          {((2 * (variables.value - (variables.index - 1) * step) +
            (variables.n - 1) * step) /
            2) *
            variables.n}
        </>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const oneStepSchema = z.object({
  n: z.string().regex(integerRegex).transform(integerTransform),
  index: z.string().regex(integerRegex).transform(integerTransform),
  value: z.string().regex(floatRegex).transform(floatTransform),
  step: z.string().regex(floatRegex).transform(floatTransform),
});

function OneStepForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    index: "",
    value: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = oneStepSchema.safeParse(inputVars);
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
        id="index"
        onChange={(e) => {
          setInputVars({ ...inputVars, index: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.index}
        integer
      />
      <NumberInput
        id="value"
        onChange={(e) => {
          setInputVars({ ...inputVars, value: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <NumberInput
        id="step"
        onChange={(e) => {
          setInputVars({ ...inputVars, step: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </button>
      {showResult && variables !== undefined && (
        <>
          Сума:{" "}
          {((2 * (variables.value - (variables.index - 1) * variables.step) +
            (variables.n - 1) * variables.step) /
            2) *
            variables.n}
        </>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

function NumberInput({
  value,
  onChange,
  id,
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
      id={id}
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
