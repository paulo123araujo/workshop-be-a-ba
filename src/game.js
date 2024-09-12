export const game = {
    letters: [],
    streak: 0,
    inputedWords: [],
    newGame: function() {
        this.letters = [];
        this.inputedWords = [];

        const alphabet = 'aabcdeefghiijlmnoopqrstuuvxz';
    
        this.letters = new Array(3).fill().map(function(letter) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        });

        this.streak = 0;
    },
    validateWord: async function (word) {
        const tempLetters = [...this.letters];
        for (let i = 0; i < this.letters.length; i++) {
            if (word.includes(tempLetters) === false) {
                return false;
            }

        }

        if (this.inputedWords.includes(word)) {
            return false;
        }

        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`)
        const data = await rawData.json();

        if (!data.length) {
            return false;
        }
        
        this.inputedWords.push(word);
        this.streak++;
        return true;
    }
}