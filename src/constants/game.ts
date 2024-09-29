export const GameStory = [
  {
    intro: [
      "You are a hacker in a world where everything is connected to the internet.",
      "You have to hack into the mainframe to stop the apocalypse.",
      "You are in a room with a lot of computers and a lot of people.",
      "You see a woman in a blue shirt and black pants.",
      "She is typing on a computer.",
      "You walk up to her and say 'Hello, I am Sanjay'",
      "She looks up at you and says 'Oh, you're the new guy'",
      "You say 'Yeah, I am'",
      "She says 'What do you do?'",
      "You say 'I am a hacker'",
    ],
    dialogs: [
      {
        command: "I am a hacker",
        choices: [
          {
            command: "What do you do?",
          },
        ],
      },
      {
        command: "I need to access the mainframe. Can you help me?",
        choices: [
          {
            command: "Yes, I can help you.",
            response: [
              {
                command: "Great! Follow me to the secure terminal.",
              },
              {
                command: "What do I need to do?",
              },
              {
                command: "You'll need to bypass the security protocols first.",
              },
            ],
          },
          {
            text: "No, I work alone.",
            response: [
              {
                command: "Be careful. This isn't a game.",
              },
              {
                command: "I can handle myself.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    intro: [
      "You awaken in a dimly lit room, the hum of an ancient computer resonating through the walls.",
      "Before you is a retro terminal with flickering green text.",
      "The machine displays a message:",
      "Welcome to retro.ai",
    ],
    dialogs: [],
  },
];
