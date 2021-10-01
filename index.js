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
  "clear",
];

function clearFrame() {}

function showInitialManPage(){
  html = `
  <p class="green-text"></p>
  `;
}


function showError(command){
  window.env.termOut.innerText = `terminal: ${command}: command not found ...`;
}

function executeCommand(key) {
  if (key === "clear") {
    clearFrame(); 
    document.body.innerHTML = "";
    // addNewPrompt();
  }else if(commands.includes(key)){

  }else{
    showError(key)
  }
}

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

var text = "";

function addNewPrompt() {
  resetEnv();
  if (window.env.container === null) {
    window.env.container = document.createElement("div");
    // console.log(window.env);
    window.env.container.setAttribute(
      "class",
      "term-container text-sm lg:text-xl flex flex-col"
    );
    window.env.container.innerHTML = `<div class="term-input flex flex-row"></div>
                           <div class="term-help green-text"></div>
                           <div class="term-output green-text"></div>
                           `;
    document.body.appendChild(window.env.container);

    let elem = `<span class="green-text"><span class="text-red-800">[</span><span class="purple-text">piyush</span>@<span class="purple-text">developer</span> </span><span class="green-text"><span class="text-red-800">]</span></span><span class="active-input ml-2"></span><span class="blinker blink block w-2 h-4 lg:h-6 green-bg h-4"></span>`.replace('\n','');

    window.env.terminalInput = document.querySelector(".term-input");
    window.env.terminalInput.innerHTML = elem;
    window.env.activeInput = document.querySelector(".active-input");
    window.env.blinker = document.querySelector(".blinker");
    window.env.termHelp = document.querySelector(".term-help");
    window.env.termOut = document.querySelector(".term-output");
  }
}

function deHydratePrompt() {
  window.env.termOut.classList.remove("term-output");
  window.env.termHelp.classList.remove("term-help");
  window.env.blinker.classList.remove("blinker", "blink", "green-bg");
  window.env.activeInput.classList.remove("active-input");
  window.env.terminalInput.classList.remove("term-input");
  window.env.container.classList.remove("term-container");
  //   resetEnv();
  // window.removeEventListener("keydown", function () {});
  // window.removeEventListener("keyup", function (e) {});
  //   addNewPrompt()
}

addNewPrompt();

var commandHistory = [];
var commandIndex = null;

function updateText(_text) {
  if (_text !== undefined && _text !== null) {
    text = _text;
    window.env.activeInput.innerText = text;
  }
}

function handleArrowKey(e) {
  // console.log(commandIndex);
  if (e.key === "ArrowUp" && commandIndex != null && commandIndex >= 0) {
    updateText(commandHistory[commandIndex]);
    commandIndex -= 1;
  } else if (e.key === "ArrowDown" && commandIndex != null) {
    if (commandIndex === commandHistory.length || commandIndex === -1) {
      updateText("");
      commandIndex = commandHistory.length;
    } else if (commandIndex < commandHistory.length) {
      updateText(commandHistory[commandIndex]);
      commandIndex += 1;
    }
  }
}

window.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "Backspace" || e.key === "Delete") {
    text = text.slice(0, text.length - 1);
  } else if (allowedText.includes(e.key.toLowerCase())) {
    text += e.key;
  } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    // console.log(e.key);
    handleArrowKey(e);
  }
  window.env.activeInput.innerText = text;
});

window.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (text.length > 0 && commandHistory[commandHistory.length - 1] !== text) {
      commandHistory.push(text);
    }
    commandIndex = commandHistory.length - 1;
    executeCommand(text);
    text = "";
    deHydratePrompt();
    addNewPrompt();
  }
});


