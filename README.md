# RetroAI quest

**RetroAI quest** is a terminal-based, AI-powered text adventure game. Embark on a retro-style, interactive fiction journey where you control the story using natural language commands, experience dynamic story generation, and make decisions that shape your path. Powered by artificial intelligence, every game play session offers a unique experience with multiple branching storylines, AI-driven character interactions, and multiple possible endings.

## **Features**

- **Terminal-Based Interface:** Classic text adventure interface with retro-inspired design and terminal commands.
- **AI-Powered Dynamic Storytelling:** The game generates new events and character responses in real-time using AI.
- **Multiple Branching Paths:** Players will encounter multiple decision points leading to different outcomes, adding replayability.
- **Retro-Inspired Aesthetic:** Experience a nostalgic text-based adventure in a terminal interface, complete with retro ASCII art and visual elements.
- **NLP (Natural Language Processing):** Players can interact with the game using free-form commands instead of rigid text options.
- **Replay ability:** Every play through offers a different story due to the dynamic AI elements and multiple endings.
- **Help System:** In-game help commands to guide players with available actions.

## **Getting Started**

### **Prerequisites**

Before running the project, make sure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **React** (v17.x or later)
  
### **Installation**

1. Clone the repository:

    ```bash
    git clone https://github.com/sanjaysah101/RetroAI-Quest
    cd RetroAI-Quest
    ```

2. Install dependencies:

    ```bash
    pnpm i
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

4. Open your browser and go to `http://localhost:5173`.

### **Gameplay**

Once the game is loaded, you will be greeted with a terminal-like interface. Type the available commands to begin your adventure.

#### **Available Commands**

- `game --start`: Start the game.
- `game --end`: End the game.
- `game --help`: Show available game commands.
- `look`: Look around your current environment.
- `go <direction>`: Move in the specified direction (e.g., `go north`).
- `pickup <item>`: Pick up an item in the current environment.
- `drop <item>`: Drop an item from your inventory.
- `use <item>`: Use an item in your possession.
- `inventory`: Check your current inventory.
- `clear`: Clear the terminal.

### **Sample Commands**

- Start your adventure:

    ```cmd
    game --start
    ```

- Look around:

    ```cmd
    look
    ```

- Move to a new area:

    ```cmd
    go north
    ```

- Check your inventory:

    ```cmd
    inventory
    ```

### **How It Works**

The game engine is built with React and utilizes AI to dynamically generate stories and adapt to player input. The AI responds to commands in real-time and provides unique outcomes based on your decisions. The game's context includes:

- **GameContext**: Manages game state, including the current scene and game history.
- **PlayerContext**: Tracks player state, including location, inventory, and decisions.

Each player's choice affects the story's direction, making each play through unique.

## **Tech Stack**

- **Frontend:** React, TypeScript, TailwindCSS for styling the terminal interface.
- **AI Integration:** The AI component generates storylines, character interactions, and dynamic responses.
- **Natural Language Processing (NLP):** Free-form text inputs are processed to understand player commands.
- **ASCII Art:** Retro-inspired visual elements using ASCII art.

## **Future Enhancements**

- Adding more storylines, decisions, and outcomes for a richer experience.
- Implementing a save/load feature for players to resume their game.
- Integrating achievements and Easter eggs hidden throughout the game.
- Improving AI responsiveness to handle even more complex player inputs.

## **Contributing**

Feel free to contribute to the project by:

1. Forking the repository.
2. Creating a new branch for your feature.
3. Submitting a pull request with a detailed description of your changes.

## **Contact**

If you have any questions or feedback, feel free to reach out:

- **Author**: Sanjay Sah
- **LinkedIn**: [https://www.linkedin.com/in/sanjaysah101/](https://www.linkedin.com/in/sanjaysah101/)
