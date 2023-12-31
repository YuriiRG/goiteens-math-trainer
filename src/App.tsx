import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import { z } from "zod";
import Latex from "./components/Latex";
import { sumFirstLast, sumFirstStep, sumOneStep, sumTwo } from "./math";

const integerRegex = /^-?[0-9]+$/;
const integerTransform = Number;

const floatRegex = /^-?[0-9]+([.,][0-9]+)?$/;
const floatTransform = (str: string) => {
  return Number(str.replace(",", "."));
};

export default function App() {
  const [mode, setMode] = useState("firstLast");
  return (
    <div className="flex justify-center p-2">
      <main className="w-[65ch]">
        <h1 className="text-3xl font-bold mb-2">
          Знайти суму арифметичної прогресії
        </h1>
        <h2 className="text-2xl font-bold mb-2">Калькулятор</h2>
        <fieldset>
          <RadioButton
            group="mode"
            id="firstLast"
            checked={mode === "firstLast"}
            label={
              <>
                значення першого та останнього членів арифметичної прогресії (
                <Latex className="inline" text="a_1" />,{" "}
                <Latex className="inline" text="a_n" />)
              </>
            }
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="firstStep"
            checked={mode === "firstStep"}
            label={
              <>
                значення першого члена арифметичної прогресії і крок прогресії (
                <Latex className="inline" text="a_1" />,{" "}
                <Latex className="inline" text="d" />)
              </>
            }
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="oneStep"
            checked={mode === "oneStep"}
            label={
              <>
                значення одного з членів арифметичної прогресії і крок прогресії
                (
                <Latex className="inline" text="a_i" />,{" "}
                <Latex className="inline" text="d" />)
              </>
            }
            onChange={(e) => setMode(e.target.value)}
          />
          <RadioButton
            group="mode"
            id="two"
            checked={mode === "two"}
            label={
              <>
                значення двох членів арифметичної прогресії (
                <Latex className="inline" text="a_i" />,{" "}
                <Latex className="inline" text="a_j" />)
              </>
            }
            onChange={(e) => setMode(e.target.value)}
          />
        </fieldset>
        Введіть дані:
        {mode === "firstLast" && <FirstLastForm />}
        {mode === "firstStep" && <FirstStepForm />}
        {mode === "oneStep" && <OneStepForm />}
        {mode === "two" && <TwoForm />}
        <h2 className="text-2xl font-bold my-2">Теорія</h2>
        Сума перших <Latex className="inline" text="n" /> членів арифметичної
        прогресії{" "}
        <Latex className="inline" text="S_n = a_1 + a_2 + ... + a_n" /> може
        бути знайдена за формулами:
        <Latex text="S_n = \frac{a_1+a_n}{2} \cdot n" blockMode />
        <Latex text="S_n = \frac{2a_1+(n-1)d}{2} \cdot n" blockMode />
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
    <form className="flex flex-col items-start gap-3 mt-3">
      <NumberInput
        id="n"
        onChange={(e) => {
          setInputVars({ ...inputVars, n: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.n}
        label={<Latex text="n = " />}
        integer
      />
      <NumberInput
        label={<Latex text="a_1 = " />}
        id="first"
        onChange={(e) => {
          setInputVars({ ...inputVars, first: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.first}
      />
      <NumberInput
        label={<Latex text="a_n = " />}
        id="last"
        onChange={(e) => {
          setInputVars({ ...inputVars, last: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.last}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumFirstLast(variables)}</>
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
    <form className="flex flex-col items-start gap-3 mt-3">
      <NumberInput
        label={<Latex text="n = " />}
        id="n"
        onChange={(e) => {
          setInputVars({ ...inputVars, n: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <NumberInput
        label={<Latex text="a_1 = " />}
        id="first"
        onChange={(e) => {
          setInputVars({ ...inputVars, first: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.first}
      />
      <NumberInput
        label={<Latex text="d = " />}
        id="step"
        onChange={(e) => {
          setInputVars({ ...inputVars, step: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumFirstStep(variables)}</>
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
    <form className="flex flex-col items-start gap-3 mt-3">
      <NumberInput
        label={<Latex text="n = " />}
        id="n"
        onChange={(e) => {
          setInputVars({ ...inputVars, n: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <div>
        значення коефіцієнтів і відповідні їм значення членів прогресії:
      </div>
      <NumberInput
        label={<Latex text="i = " />}
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
        label={<Latex text="a_i = " />}
        onChange={(e) => {
          setInputVars({ ...inputVars, value: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <div>крок прогресії:</div>
      <NumberInput
        id="step"
        label={<Latex text="d = " />}
        onChange={(e) => {
          setInputVars({ ...inputVars, step: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumOneStep(variables)}</>
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

  return (
    <form className="flex flex-col items-start gap-3 mt-3">
      <NumberInput
        label={<Latex text="n = " />}
        id="n"
        onChange={(e) => {
          setInputVars({ ...inputVars, n: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <div>
        значення коефіцієнтів і відповідні їм значення членів прогресії:
      </div>
      <NumberInput
        label={<Latex text="i = " />}
        id="index"
        onChange={(e) => {
          setInputVars({ ...inputVars, index: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.index}
        integer
      />
      <NumberInput
        label={<Latex text="a_i = " />}
        id="value"
        onChange={(e) => {
          setInputVars({ ...inputVars, value: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <NumberInput
        label={<Latex text="j = " />}
        id="index2"
        onChange={(e) => {
          setInputVars({ ...inputVars, index2: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.index2}
        integer
      />
      <NumberInput
        label={<Latex text="a_j = " />}
        id="value2"
        onChange={(e) => {
          setInputVars({ ...inputVars, value2: e.target.value });
          setShowResult(false);
        }}
        value={inputVars.value2}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && <>Сума: {sumTwo(variables)}</>}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

function NumberInput({
  value,
  onChange,
  id,
  integer = false,
  label,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  integer?: boolean;
  label: ReactNode;
}) {
  return (
    <div className="flex justify-start w-48">
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
      <input
        type="number"
        id={id}
        onChange={onChange}
        value={value}
        step={integer ? 1 : "any"}
        className="border-2 border-gray-400 rounded-lg min-w-0 flex-grow"
        required
      />
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
    <div className="my-1">
      <input
        type="radio"
        name={group}
        value={id}
        id={id}
        className="align-middle"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-1">
        {label}
      </label>
    </div>
  );
}

function SubmitButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 font-bold bg-gray-200 rounded-lg transition-colors hover:bg-gray-300"
    >
      {children}
    </button>
  );
}
