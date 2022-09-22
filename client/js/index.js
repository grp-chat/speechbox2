const sock = io();

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
var nickname;

const promptMsg = () => {

    const sat2PMStudents = ["LK", "LXR", "SZF", "JHA", "JL", "JV", "H", "TCR"];
    const sun230pmStudents = ["LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];
    const sat4pmStudents = ["JX", "JZ", "TWN", "LJY", "LSH", "ELI", "CUR", "CT", "RYD"];

    const studentLogins = {
        teacher: { pinNumber: '8', nickname: 'TCR' },
        len: { pinNumber: '1502', nickname: 'LEN' },

        sat2pmStudent1: { pinNumber: '9852', nickname: 'LK' },
        sat2pmStudent2: { pinNumber: '9035', nickname: 'LXR' },
        sat2pmStudent3: { pinNumber: '3839', nickname: 'SZF' },
        sat2pmStudent4: { pinNumber: '3583', nickname: 'JHA' },
        sat2pmStudent5: { pinNumber: '1072', nickname: 'JL' },
        sat2pmStudent6: { pinNumber: '5691', nickname: 'JV' },
        sat2pmStudent7: { pinNumber: '4048', nickname: 'H' },

        sat4pmStudent1: { pinNumber: '1289', nickname: "JX" },
        sat4pmStudent2: { pinNumber: '3825', nickname: "JZ" },
        sat4pmStudent3: { pinNumber: '8579', nickname: "TWN" },
        sat4pmStudent4: { pinNumber: '8828', nickname: "LJY" },
        sat4pmStudent5: { pinNumber: '1529', nickname: "LSH" },
        sat4pmStudent6: { pinNumber: '3191', nickname: "ELI" },
        sat4pmStudent7: { pinNumber: '3307', nickname: "CUR" },
        sat4pmStudent8: { pinNumber: '2318', nickname: "CT" },
        sat4pmStudent9: { pinNumber: '7385', nickname: "RYD" },

        sun230pmStudent1: { pinNumber: '1198', nickname: "LOK" },
        sun230pmStudent2: { pinNumber: '6139', nickname: "KSY" },
        sun230pmStudent3: { pinNumber: '7051', nickname: "KN" },
        sun230pmStudent4: { pinNumber: '4162', nickname: "JT" },
        sun230pmStudent5: { pinNumber: '2105', nickname: "CJH" },
        sun230pmStudent6: { pinNumber: '5086', nickname: "CED" },
        sun230pmStudent7: { pinNumber: '2167', nickname: "KX" },
        sun230pmStudent8: { pinNumber: '6588', nickname: "TJY" }
    }

    const getNickname = pinNumber => {
        return Object.values(studentLogins).find(obj => obj.pinNumber === pinNumber)?.nickname;
    }

    var nick = prompt("Please enter your pin number:");
    while (nick.length == 0) {
        alert("Please enter your pin number!");
        nick = prompt("Please enter your pin number:");
    }

    nickname = getNickname(nick);

    /* sat2PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    });
    sun230PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    }); */

    if (typeof (nickname) === 'undefined') {
        alert("Wrong pin number!");
        promptMsg();
    }
};

promptMsg();
sock.emit('newuser', nickname);

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
class fixedCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        //if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag);
    }
}

const allCommands = [
    
    new fixedCommand("TCR: clear", 'clearAllResults')
    
];
//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC


function createChatDivs() {
    const chatSec = document.getElementById("chat");
    var chatDiv = document.createElement("div");
    //var chatDiv = document.getElementById("chatdiv");
    //chatDiv.setAttribute("id", "chatdiv");
    chatDiv.style.width = "320px";
    chatDiv.style.height = "320px";
    //chatDiv.style = "background:rgba(255, 255, 255, 0.5); color:black; overflow: auto;"
    chatDiv.style.background = "rgba(255, 255, 255, 0.5)";
    chatDiv.style.color = "black";
    chatDiv.style.overflow = "auto";
    chatDiv.style.overflowX = "hidden";
    //chatDiv.style.float = "right";
    //chatDiv.style.marginLeft = "2%";
    //chatDiv.style.position = "fixed";
    chatDiv.style.top = "30px";
    //chatDiv.style.right = "30px";


    chatSec.appendChild(chatDiv);

    var chatInput = document.createElement('input');
    //chatInput.className = "form-control";
    chatInput.style.width = "255px";
    chatInput.style.height = "45px";
    chatInput.setAttribute("id", "chatinput");
    chatInput.setAttribute("type", "text");
    chatInput.style.display = "inline";
    chatInput.style.fontSize = "1.2em";
    chatDiv.appendChild(chatInput);

    var chatBtn = document.createElement('button');

    chatBtn.className = "btn";
    chatBtn.setAttribute("id", "chatBtn");
    chatBtn.innerHTML = "Send";
    chatBtn.style.height = "50px";
    chatBtn.style.width = "55px";


    chatDiv.appendChild(chatBtn);

    var div3 = document.createElement('div');
    div3.setAttribute("id", "div3");
    div3.style.width = '350px';
    div3.style.height = '260px'
    div3.style.color = 'black';
    div3.style.background = 'rgba(236, 236, 236, 0.5)';
    div3.style.overflowY = "auto";
    chatDiv.appendChild(div3);

    chatBtn.addEventListener('click', function () {
        var message = nickname + ': ';
        message += chatInput.value;
        sock.emit('chat-to-server', message);
        chatInput.value = '';
    });

    chatInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("chatBtn").click();
        }

    });

    return chatSec;
}

function appendMessage(message) {
    if (message.length < 6) {return}
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    var div3 = document.getElementById("div3");
    div3.append(messageDiv);
    div3.scrollTop = div3.scrollHeight;
    var extractNickname = message.slice(0, 3).replace(/[^A-Z]+/g, "");
    const sliceMessage = message.slice(0, 138); 
    updateSpeechBox(sliceMessage, extractNickname);

    allCommands.forEach((command) => {
        command.executeCommand(message);
    });
}
function appendResult(result, playerId) {
    if (!result) {return;}
    
    containerArr.forEach(container => {
        if (playerId === container.playerId) {
            container.nextElementSibling.querySelector(".wrapper .number").innerHTML = result;
        }
    });
}

function getTheCorrectContainer(extractNickname) {

    return containerArr.find(container => container.playerId === extractNickname);

}

function updateSpeechBox(message, extractNickname) {

    //var characters2 = [];
    var characters2 = [];

    const getContainer = getTheCorrectContainer(extractNickname);
    const elem = getContainer.querySelectorAll('span');
    elem.forEach(e => e.remove());
    //getContainer.innerHTML = "";
    
    getContainer.textLines = message;

    let line = getContainer.textLines;
    line.split("").forEach((character) => {
        var span = document.createElement("span");
        span.textContent = character;
        getContainer.appendChild(span);
        characters2.push({
            span: span,
            isSpace: character === " " && !line.pause,
            delayAfter: line.speed || 20,
            classes: line.classes || []
        });
    });

    setTimeout(() => {
        revealOneCharacter(characters2);
    }, 600)
}

createChatDivs();

const container1 = document.getElementById("player1");
const container2 = document.getElementById("player2");
const container3 = document.getElementById("player3");
const container4 = document.getElementById("player4");
const container5 = document.getElementById("player5");
const container6 = document.getElementById("player6");
const container7 = document.getElementById("player7");
const container8 = document.getElementById("player8");
const container9 = document.getElementById("player9");
const container10 = document.getElementById("player10");

const containerArr = [
    container1, container2, container3, container4, container5, container6, container7, container8,
    container9, container10
]

// container1.playerId = "LK";
// container2.playerId = "LXR";
// container3.playerId = "SZF";
// container4.playerId = "JHA";
// container5.playerId = "JL";
// container6.playerId = "JV";
// container7.playerId = "H";
// container1.playerId = "JX";
// container2.playerId = "JZ";
// container3.playerId = "TWN";
// container4.playerId = "LJY";
// container5.playerId = "LSH";
// container6.playerId = "ELI";
// container7.playerId = "CUR";
// container8.playerId = "RYD";
// container9.playerId = "CT";
container1.playerId = "LOK";
container2.playerId = "CJH";
container3.playerId = "CED";
container4.playerId = "KX";
container5.playerId = "KN";
container6.playerId = "TJY";
container7.playerId = "JT";
container8.playerId = "KSY";
container9.playerId = "LSH";
container10.playerId = "TCR";

const emojis = {
    slot1Boy: "👨‍✈️",
    slot1Girl: "👩‍✈️",
    slot2Boy: "👨‍🚀",
    slot2Girl: "👩‍🚀",
    slot3Boy: "👨‍⚕️",
    slot3Girl: "👩‍⚕️",
    slot4Boy: "👨‍🎓",
    slot4Girl: "👩‍🎓",
    slot5Boy: "👨‍🌾",
    slot5Girl: "👩‍🌾",
    slot6Boy: "👨‍🔬",
    slot6Girl: "👩‍🔬",
    slot7Boy: "👨‍💼",
    slot7Girl: "👩‍💼",
    slot8Boy: "👨‍🍳",
    slot8Girl: "👩‍🍳",
    slot9Boy: "👨‍🎨",
    slot9Girl: "👩‍🎨",
    slot10Boy: "🕵"
}

const emoji1 = container1.nextElementSibling.querySelector(".emoji");
const emoji2 = container2.nextElementSibling.querySelector(".emoji");
const emoji3 = container3.nextElementSibling.querySelector(".emoji");
const emoji4 = container4.nextElementSibling.querySelector(".emoji");
const emoji5 = container5.nextElementSibling.querySelector(".emoji");
const emoji6 = container6.nextElementSibling.querySelector(".emoji");
const emoji7 = container7.nextElementSibling.querySelector(".emoji");
const emoji8 = container8.nextElementSibling.querySelector(".emoji");
const emoji9 = container9.nextElementSibling.querySelector(".emoji");
const emoji10 = container10.nextElementSibling.querySelector(".emoji");

emoji1.innerHTML = emojis.slot1Boy;
emoji2.innerHTML = emojis.slot2Boy;
emoji3.innerHTML = emojis.slot3Boy;
emoji4.innerHTML = emojis.slot4Girl;
emoji5.innerHTML = emojis.slot5Girl;
emoji6.innerHTML = emojis.slot6Boy;
emoji7.innerHTML = emojis.slot7Boy;
emoji8.innerHTML = emojis.slot8Boy;
emoji9.innerHTML = emojis.slot9Boy;
emoji10.innerHTML = emojis.slot10Boy;

var speeds = {
    pause: 500, //Higher number = longer delay
    slow: 120,
    normal: 90,
    fast: 10,
    superFast: 10
};

const textLines = [
    { speed: speeds.fast, string: "Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! " },
    // { speed: speeds.fast, string: "", pause: true },
    // { speed: speeds.fast, string: "Have you seen my pet" },
    // { speed: speeds.fast, string: "frog", classes: ["green"] },
    // { speed: speeds.fast, string: "around? 👨‍✈️" }
];


containerArr.forEach(container => {
    container.textLines = "I am not connected yet.";
    container.nextElementSibling.querySelector(".wrapper .nametag").innerHTML = container.playerId;
});



var characters = [];
containerArr.forEach(container => {
    let line = container.textLines;
    line.split("").forEach((character) => {
        var span = document.createElement("span");
        span.textContent = character;
        container.appendChild(span);
        characters.push({
            span: span,
            isSpace: character === " " && !line.pause,
            delayAfter: line.speed,
            classes: line.classes || []
        });
    });


});

// textLines.forEach((line, index) => {
//     if (index < textLines.length - 1) {
//         line.string += " "; //Add a space between lines
//     }

//     line.string.split("").forEach((character) => {
//         var span = document.createElement("span");
//         span.textContent = character;
//         container1.appendChild(span);
//         characters.push({
//             span: span,
//             isSpace: character === " " && !line.pause,
//             delayAfter: line.speed,
//             classes: line.classes || []
//         });
//     });
// });



function revealOneCharacter(list) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });
    var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if (list.length > 0) {
        setTimeout(function () {
            revealOneCharacter(list);
        }, delay);
    }
}

sock.on('chat-to-clients', data => {
    const message = data.message;
    const getResult = data.getResult;
    const playerId = data.playerId;
    appendMessage(message);
    appendResult(getResult, playerId);

});
sock.on('clearAllResults', () => {
    containerArr.forEach(container => {
        container.nextElementSibling.querySelector(".wrapper .number").innerHTML = "0.000";
    });
});

//Kick it off
setTimeout(() => {
    revealOneCharacter(characters);
}, 600)

