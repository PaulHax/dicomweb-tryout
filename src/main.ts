import "./style.css";
import { setupGetInstance, setupSource } from "./dicomWebSource";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
      <button id="instance" type="button">Get instance</button>
    </div>
    <div class="card">
      <button id="counter" type="button">Get Studies</button>
    </div>
    <pre id="result"></pre>
  </div>
`;

setupGetInstance(document.querySelector<HTMLButtonElement>("#instance")!);

setupSource(
  document.querySelector<HTMLButtonElement>("#counter")!,
  document.querySelector<HTMLElement>("#result")!
);
