/*

Message from owner

if(youUseJS) {
    console.log("use typescript, js sucks")
} else {
    console.log("thank you for not using js")
}

*/

const commands = [
    "ls",
    "pwd",
    "clear",
    "cd"
]

var dir = "~";
var listDir = "Exhibit-A\nExhibit-B\nExhibit-C\nExhibit-D\nExhibit-E\n\n"
var splitDir = listDir.split('\n')
var msg = 'Welcome to the Terminus CLONE!\n\nHere are some of the commands:\npwd: Print Working Directory\nclear: Clear screen\nls: List files in the current working directory or second argument if appropriate\ncd: Change directory to second argumment\n'
var ip = "User"


class Terminal {
    constructor() {
        for (let d in splitDir) {
            console.log(splitDir[d])
        }
        document.getElementById("ps1").innerHTML = `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> `


    }

    moveBack(s) {
        // if(s=="Exhibit-A") then dir == Exhibit-A/..
        console.log(`cd .. working with current directory == ${s}`)
        if (s == "Exhibit-A" || s == "Exhibit-B" || s == "Exhibit-C" || s == "Exhibit-D" || s == "Exhibit-E") {
            dir = "~" 
        }
    }

    clearMe() {
        document.getElementById("minput").value = "";
    }

    getIP() {
        $.getJSON("https://api.ipify.org?format=json", (data) =>{
         
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
                    if (dir == "~") {
                        history.textContent+= listDir
                    } else if (dir == "Exhibit-A") {
                        history.textContent+= "\njeoifjfoijeoif\n\n"
                    } else if (dir == "Exhibit-B") {
                        history.textContent+= "\nexhibit-b ls cmd\n\n"
                    } else if (dir == "Exhibit-C") {
                        history.textContent+= "\nexhibit-c ls cmd\n\n"
                    } else if (dir == "Exhibit-D") {
                        history.textContent+= "\nexhibit-d ls cmd\n\n"
                    } else if (dir == "Exhibit-E") {
                        history.textContent+= "\nexhibit-e ls cmd\n\n"
                    }
                    else {
                        console.log(`dir==${dir}`);
                    }
                }
                else if (splitInput[0] == "clear") {
                    history.textContent= ""
                }
            
                else if(splitInput[0] == "pwd") {
                    history.textContent+= `${dir}\n\n`
                }
                else if (splitInput[0] == "cd") {
                    for (let d in splitDir) { // counts by number of items in splitDir
                        // if the input's second word is the word of splitInput[d]
                        if (second == splitDir[d]) {
                            history.textContent+= `Current directory is now ${splitDir[d]}!\n\n`
                            dir = splitDir[d]
                            // console.log(`A: ${splitDir[d]}`)
                            // console.log(`B: ${second}`)
                        }

                        //console.log(`${second} (second) != ${splitDir[d]} (splitDir[d])`)
                    }
                    if (second == "..") {
                        this.moveBack(dir);
                        //history+="\n\n"
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
                        history.textContent+= `\n[\n\tstderr: (Coming from '${inputVal}')\n]\n\n`
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
        });
    }
};



document.querySelector("#minput").focus();
const terminal = new Terminal();
document.getElementById("ps1").innerHTML = `(${ip}) <span style="color: #00FF87">➜</span> <span style="color: #00AFFF">${dir}</span> `
terminal.run();    
