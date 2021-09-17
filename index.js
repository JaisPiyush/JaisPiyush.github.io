var commands = [
  "pwd",
  "ls",
  "cd",
  "man",
  "help",
  "cat",
  "hostname",
  "ping",
  "vi",
  "nano",
  "vim",
];

function executeCommand(key) {}

const allowedText =
  "abcdefghijklmnopqrstuvwxyz1234567890~`!@#$%^&*()_+=-\\|]}[{'\";:/?.>,<".split(
    ""
  );

function resetEnv() {
  window.env = {
    container: null,
    terminalInput: null,
    activeInput: null,
    blinker: null,
    termHelp: null,
    termOut: null,
  };
}

function addNewPrompt() {
  resetEnv();
  let container = document.createElement("div");
  container.setAttribute(
    "class",
    "term-container text-sm lg:text-xl flex flex-col"
  );
  container.innerHTML = `<div class="term-input flex flex-row"></div>
                           <div class="term-help"></div>
                           <div class="term-output"></div>
                           `;
  document.body.appendChild(container);
  window.env.container = container;

  let elem = `<span class="green-text">[piyush@engineer </span>~<span class="green-text">]$</span>
              <span class="active-input ml-2"></span>
              <span class="blinker blink block w-2 h-6 green-bg h-4"></span>
             `;

  window.env.terminalInput = document.querySelector(".term-input");
  window.env.terminalInput.innerHTML = elem;
  window.env.activeInput = document.querySelector(".active-input");
  window.env.blinker = document.querySelector(".blinker");
  window.env.termHelp = document.querySelector(".term-help");
  window.env.termOut = document.querySelector(".term-output");

  let text = "";

  window.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key === "Backspace" || e.key === "Delete") {
      text = text.slice(0, text.length - 1);
    } else if (allowedText.includes(e.key.toLowerCase())) {
      text += e.key;
    }
    window.env.activeInput.innerText = text;
  });

  window.addEventListener('keyup', function(e){
    if (e.key === "Enter") {
        console.log(e);
      executeCommand(text);
      text = ''
      deHydratePrompt();
      addNewPrompt();
    }
  });
}

function deHydratePrompt() {
  window.env.termOut.classList.remove("term-output");
  window.env.termHelp.classList.remove("term-help");
  window.env.blinker.classList.remove("blinker", "blink", "green-bg");
  window.env.activeInput.classList.remove("active-input");
  window.env.terminalInput.classList.remove("term-input");
  window.env.container.classList.remove("term-container");
  window.removeEventListener('keydown', function(){});
  window.removeEventListener('keyup', function(){});
  resetEnv();
}

addNewPrompt();
