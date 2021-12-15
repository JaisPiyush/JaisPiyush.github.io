var commands = [
  "pwd",
  "ls",
  "cd",
  "man",
  "help",
  "ping",
  "contact",
  "vim",
  "clear",
  "intro"
];


function getManPageHTML(){
  return `<div class="green-text">
  <div class="flex flex-row justify-center w-full font-bold"><p>User Commands</p></div>
  <p class="text-purple-500 font-bold">DESCRIPTION</p>
  <div class="flex flex-col ml-16">
  <p>List information about COMMANDS available in the simulator.</p>
  <p>Commands will allow viewer to gain knowledge about <span class="text-red-500">me</span>.</p>
  <p>No techinal or non-uinux users might find this resume hard to navigate</p>
  <p>just hold your breaths and dive into 1990's computer world.</p>
  <p>Just Type any <span class="text-red-500"><i>command</i></span> you see below</p>
  <p class="text-red-500 mt-2">pwd</p>
  <p class="ml-12">show current status about me in the real world</p>
  <p class="text-red-500 mt-2">ls</p>
  <p class="ml-12">show all directories containing information about me</p>
  <p class="text-red-500 mt-2">cd</p>
  <p class="ml-12">change directories to jump into details of the directory.</p>
  <p class="ml-12">Type <span class="text-red-500">cd <i>dir_name</i></span>.</p>
  <p class="text-red-500 mt-2">man</p>
  <p class="ml-12">show all commands and their information regarding this simulator.</p>
  <p class="text-red-500 mt-2">help</p>
  <p class="ml-12">alternative name for <span class="text-red-500"><i>man</i></span></p>
  <p class="text-red-500 mt-2">clear</p>
  <p class="ml-12">clear the screen</p>
  <p class="text-red-500 mt-2">ping</p>
  <p class="ml-12">starts a message box in the infamous <span class="text-red-500">vim</span> text editor.</p>
  <p class="ml-12">Just navigate and enter the details, and look into bottom for text editor helps</p>
  <p class="text-red-500 mt-2">contact</p>
  <p class="ml-12">alternative name for <span class="text-red-500"><i>ping</i></span></p>
  <p class="text-red-500 mt-2">intro</p>
  <p class="ml-12">show introduction about me along with the personal details</p>
  
  </div>
  </div>`;
}

function executeManCommand(){
  showOutput(getManPageHTML());
}


function getPwdHTML(){
  return `<p class="green-text">/piyush_jaiswal/life/education/manipal_university_jaipur</p>`
}


function getLsCommandHtml() {
  return `
  <div class="green-text">
  <p>Use <span class="text-red-500">'cd <i>dir_name</i>'</span> command to jump into these directories to know more about me</p>
  <p>For example run <span class="text-red-500">'cd education'</span> to check about my education</p>
  <p class="mt-2">Currently available directories:</p>
  <div class="flex flex-row mt-4 font-bold">
    <p>skills</p>
    <p class="ml-8">projects</p>
    <p class="ml-8">education</p>
    <p class="ml-8">must_reads</p>
  </div>
  </div>
  `;
}

function executeLsCommand(){
  let html = getLsCommandHtml();
  
  showOutput(html);
}


function showOutput(txt){
  window.env.termOut.innerHTML = txt;
}

function clearFrame() {
  document.body.innerHTML = "";
}


function getSkillsHTML(){
  return `
  <div class="green-text">
  <div class="flex flex-row justify-center w-full font-bold"><p>Skills</p></div>
  <p>These are the skills I honed in the past 3 years<br>The indicators only shows my level of confidence, not to be confused with expertiese</p>
  <p class="flex flex-row mt-4"><span class="block w-100">+ Backend Development using Django</span><span class="ml-4 text-xl text-yellow-500">[================><span class="text-gray-400">====</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Backend Development using Golang</span><span class="ml-4 text-xl text-yellow-500">[========><span class="text-gray-400">============</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Frontend Development using VueJS</span><span class="ml-4 text-xl text-yellow-500">[================><span class="text-gray-400">====</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Frontend Development using ReactJS</span><span class="ml-4 text-xl text-yellow-500">[===========><span class="text-gray-400">=========</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ App Development using Flutter</span><span class="ml-4 text-xl text-yellow-500">[================><span class="text-gray-400">====</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Blockchain and Dapps</span><span class="ml-4 text-xl text-yellow-500">[========><span class="text-gray-400">============</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Linux OS</span> <span class="ml-4 text-xl text-yellow-500">[========><span class="text-gray-400">============</span>] </span></p>
  <p class="flex flex-row"><span class="block w-100">+ Git VCS</span> <span class="ml-4 text-xl text-yellow-500">[========><span class="text-gray-400">============</span>] </span></p>
  </div>
  `;
}


function getProjectsHTML(){
  return ``;
}



function executeCdCommand(command){
  let dir = command.split(" ")[1];
  switch(dir){
    case "skills":
      showOutput(getSkillsHTML());
      break;
    case "projects":
      showOutput(getProjectsHTML())
      break;
    default:
      showDirError(dir);

  }
}


function getIntroCommandHTML(){
  return `
  <div class="flex flex-row justify-center w-full font-bold"><p>Introduction</p></div>
  <p class="green-text animated-intro">Hi!</p>
  <p class="green-text animated-intro">This is <span class="text-red-500">Piyush Jaiswal</span><p>
  <p class="green-text animated-intro">I am a computer enthusiast, continously trying to create next big thing in the technology world.<br>Yeah, I envy Linus Torvald, Guido, Vitalik and others.
  I think you have stopped here to check me out.</p>
  <p class="green-text animated-intro"><br>These are my personal details:</p>
  <p class="green-text animated-intro flex flex-row w-full mt-2"><span><img src="./img/gmail.png" width="24px"></span><span class="ml-4"> iampiyushjaiswal103@gmail.com</span></p>
  <p class="green-text animated-intro flex flex-row w-full mt-2"><span><img src="./img/phone.png" width="24px"></span><span class="ml-4"> +916392886167</span></p>
  <p class="green-text animated-intro flex flex-row w-full mt-2 mb-6"><span><img src="./img/linkedin.png" width="24px"></span><span class="ml-4"><a href="https://www.linkedin.com/in/piyush-jaiswal-aa3593178/">https://www.linkedin.com/in/piyush-jaiswal-aa3593178/</a></span></p>
  `;
}

function showIntroPage(){
  let html = getIntroCommandHTML();
  html += getManPageHTML();
  showOutput(html);
}


function showWelcomePage(){}


function showError(command){
  window.env.termOut.innerText = `terminal: ${command}: command not found ...`;
}

function showDirError(dir){
  window.env.termOut.innerText = `terminal: cd: ${dir}: No such directory`
}

function executeCommand(key) {
  if (key === "clear") {
    clearFrame(); 
    // addNewPrompt();
  }else if(commands.includes(key) || key.includes("cd ")){
    switch(key){
      case "intro":
        showIntroPage();
        break;
      case "ls":
        executeLsCommand();
        break;
      case "man":
        executeManCommand();
        break;
      case "help":
        executeManCommand();
        break;
      case "pwd":
        showOutput(getPwdHTML());
        break;
      default:
        if (key.includes("cd ")){
          executeCdCommand(key);
        }
    }

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
  if (e.key === "Backspace" || e.key === "Delete") {
    text = text.slice(0, text.length - 1);
  }else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    handleArrowKey(e);
  }else if (allowedText.includes(e.key.toLowerCase()) || e.key === " "){
    text += e.key;
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


