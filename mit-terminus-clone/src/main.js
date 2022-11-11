/*

Message from owner

if(youUseJS) {
    console.log("use typescript, js sucks")
} else {
    console.log("thank you for not using js")
}

*/
const cafe = "Cafe"
const ss = "Social Studies"
const science = "Science"
const math = "Math"
const la = "Language Arts"
const reading = "Reading"
const commands = [
    "ls",
    "pwd",
    "clear",
    "cd"
]

var dir = "~";
var listDir = `${cafe}\n${science}\n${math}\n${ss}\n${la}\n${reading}\n\n`
var splitDir = listDir.split('\n')
var dt = new Date();
dt.get
var msg = `Last login: ${dt.getMonth()} ${dt.getDay()} ${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} ${navigator.language} ${navigator.appName}\n`
// Welcome to the Terminus CLONE!\n\nHere are some of the commands:\npwd: Print Working Directory\nclear: Clear screen\nls: List files in the current working directory or second argument if appropriate\ncd: Change directory to second argumment\n
var ip = "User"


class Terminal {
    constructor() {
        for (let d in splitDir) {
            console.log(splitDir[d])
        }
        document.getElementById("ps1").innerHTML = `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> `


    }

    moveBack(s) {
        
        console.log(`cd .. working with current directory == ${s}`)
        if (s == cafe || s == reading || s == ss || s == math || s == science || s == la) {
            dir = "~"
            listDir = `${cafe}\n${science}\n${math}\n${ss}\n${la}\n${reading}\n\n`
            splitDir = listDir.split('\n')
        }
    }

    clearMe() {
        document.getElementById("minput").value = "";
    }

    getIP() {
        $.getJSON("https://api.ipify.org?format=json", (data) => {

            // Setting text of element P with id gfg
            ip = data.ip
        })
    }

    run() {
        const term = document.getElementById("terminal");
        document.querySelector("#history").textContent = msg;
        this.getIP()

        term.addEventListener("keypress", (keycode) => {
            document.getElementById("ps1").innerHTML = `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> `
            let history = document.querySelector("#history")
            if (keycode.key === "Enter") {
                keycode.preventDefault();
                let inputVal = document.querySelector("#minput").value;
                let splitInput = inputVal.split(" ");
                //(${ip}) ➜  Documents
                history.innerHTML += `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> ${inputVal}\n`
                //history.innerHTML += `<span>(base) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span>  </span>`
                let second = splitInput[1];
                if (splitInput[0] == "ls") {
                    switch(dir)
                    {
                        case "~":
                            listDir = `${cafe}\n${science}\n${math}\n${ss}\n${la}\n${reading}\n\n`
                            splitDir = listDir.split('\n')
                            break;
                        case cafe: 
                            listDir = `Seems like the cafe is empty!\n\n`
                            splitDir = listDir.split('\n')
                            break;
                        case math:
                            break;
                        case ss:
                            listDir = `Desk\n\n`
                            splitDir = listDir.split('\n')
                            break;
                        case science:
                            listDir = `Microscope\nSciency Stuff\n\n`
                            splitDir = listDir.split('\n')
                            break;
                        case reading:
                            listDir = `Bookshelf\n\n`
                            splitDir = listDir.split('\n')
                            break;
                        case la:
                            listDir = `Bookshelf\n\n`
                            splitDir = listDir.split('\n')
                            break;  
                    }
                    history.textContent += listDir 
                }
                else if (splitInput[0] == "clear") {
                    history.textContent = ""
                }

                else if (splitInput[0] == "pwd") {
                    history.textContent += `${dir}\n\n`
                }
                else if (splitInput[0] == "cd") {
                    if (second == "..") {
                        this.moveBack(dir);
                        //history+="\n\n"
                    }
                    else { 
                        for (let d in splitDir) { // counts by number of items in splitDir
                            // if the input's second word is the word of splitInput[d]
                            console.log(`second==splitDir[d]==${second}==${splitDir[d]}`)
                            let flag=false;
                            if (second == splitDir[d]) {
                                history.textContent += `Current directory is now ${splitDir[d]}!\n\n`
                                dir = splitDir[d]
                                flag=true;

                                break
                                // console.log(`A: ${splitDir[d]}`)
                                // console.log(`B: ${second}`)
                            } if(flag) {
                                history.textContent += `There is no directory called ${second}\n\n`
                                
                            }

                            //console.log(`${second} (second) != ${splitDir[d]} (splitDir[d])`)
                        }
                    }
                    console.log(`Current dir: ${dir}`)
                }
                else {

                    // TODO: make this code readable
                    let flag = false;
                    for (let command in commands) {
                        if (!flag) {
                            //console.log(`command.includes(s) == ${commands[command]}.includes(${input}) ==  ${commands[command].includes(splitInput[s])}`) // dbg
                            if (commands[command].includes(inputVal)) {
                                history.textContent += `\n[\n\tstderr: (Coming from '${inputVal}')\n\thint: Did you mean '${commands[command]}'\n]\n\n`
                                flag = true;
                            }
                        }
                    }
                    if (!flag) {
                        history.textContent += `\n[\n\tstderr: (Coming from '${inputVal}')\n]\n\n`
                    }
                }
                this.clearMe();
            }
            else if (keycode.key == '`') {
                keycode.preventDefault();
                console.log("Trigger Autocomplete")
                let input = document.querySelector("#minput").value;
                let splitInput = input.split(" ");
                let out = document.getElementById("out")
                for (let command in commands) {
                    if (commands[command].includes(input)) {
                        out = commands[command]
                    }
                }
            }
            window.location.href = "#bottom"
            document.querySelector("#minput").focus();
        });
    }
};



document.querySelector("#minput").focus();
const terminal = new Terminal();
document.getElementById("ps1").innerHTML = `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> `
terminal.run();    



/* 

EXCESS


IF DIR

if (dir == "~") {
                        listDir = `${cafe}\n${science}\n${math}\n${ss}\n${la}\n${reading}\n\n`
                        splitDir = listDir.split('\n')
                        //history.textContent += listDir
                    } else if (dir == cafe) {
                        // history.textContent += `\ncafe ls cmd\n\n`
                        listDir = `Seems like the cafe is empty!\n\n`
                        splitDir = listDir.split('\n')
                    } else if (dir == ss) {
                        // history.textContent += "\nsocial studies ls cmd\n\n"
                        listDir = `Desk\n\n`
                        splitDir = listDir.split('\n')
                    } else if (dir == science) {
                        // history.textContent += "\nscience ls cmd\n\n"
                        listDir = `Microscope\nSciency Stuff\n\n`
                        splitDir = listDir.split('\n')
                    } else if (dir == reading) {
                        // history.textContent += "\nreading ls cmd\n\n"
                        listDir = `Bookshelf\n\n`
                        splitDir = listDir.split('\n')
                    } else if (dir == la) {
                        // history.textContent += "\nlanguage arts ls cmd\n\n"
                        listDir = `Bookshelf\n\n`
                        splitDir = listDir.split('\n')
                    } else if (dir == math) {
                        // history.textContent += "\nmath ls cmd\n\n"
                        listDir = `Calculator\nWorkbooks\n\n`
                        splitDir = listDir.split('\n')
                    }
                    else {
                        console.log(`dir==${dir}`);
                    }

*/