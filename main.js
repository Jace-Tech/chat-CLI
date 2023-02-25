const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isDone = false;
const quitCommands = ["bye", "see ya", "quit", "later"]
const quitCommandsReplies = ["bye", "see ya", "logging out..", "later"]

// List of dialogs chatty can take in, You can add more to it.
const dialogs = [
  {
    question: "Hi | Hello | Howdy | What's up | Hey",
    answers: ["Hi there", "Hello", "Hiii 🙃🙃"],
  },
  {
    question: "Will you kill humans?",
    answers: ["Maybe 😈", "Hell no!, There are cool", "Lemme think about it 🤔",
    ],
  },
  {
    question: "How are you doing?",
    answers: ["I'm good, WBU?", "Very well, Thanks"],
  },
  {
    question: "I'm ok | I'm good | I'm great | I'm cool",
    answers: ["Oh nice!, good to know", "Awesome!"],
  },
  { 
    question: "Yup | Yeah | Yea | Yes",
    answers: ["🤜", "✌️", "👍🏻"] 
  },
];

// To get an answer based of the dianlog
const getAnswer = (dialog) => {
  if(!dialog) return "Sorry I didn't get that... can you rephrase?"
  
  let answer = "Sorry, I wasn't trained to answer that";
  if(!dialog.answers) return answer

  if(Array.isArray(dialog.answers)) {
    let length = dialog.answers.length;
    answer = dialog.answers[Math.floor(Math.random() * length)]
  }
  else {
    answer = dialog.answers
  }
  return answer;
}

// To make it reply few seconds late
const sleep = async (time = 1000) => await new Promise((resolve) => {
  setTimeout(() => resolve(true), time)
})

const main = async (isDone) => {
  if(isDone) {
    await sleep()
    const reply = quitCommandsReplies[Math.floor(Math.random() * quitCommandsReplies.length)]
    console.log(`[BOT]:> ${reply}\n`)
    process.exit(1)
  } 
  
  rl.question("[ME] :> ", async (msg) => {
    // Check if message is bye
    if(quitCommands.includes(msg)) main(true);

    const dialog = dialogs.find(_dialog => _dialog.question.toLowerCase().includes(msg.toLowerCase()))
    const reply = getAnswer(dialog)

    await sleep(1000)

    console.log(`[BOT]:> ${reply}\n`)
    main(isDone)
  })
}


// Start Bot
main(isDone)