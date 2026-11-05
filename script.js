
// KANNADA GRAMMAR CHECKER
// Version 1.0

// Common Kannada spelling corrections
const spellingRules = {
    "ಶಾಲೆಗೆ": "ಶಾಲೆಗೆ",
    "ವಿದ್ಯಾರ್ತಿ": "ವಿದ್ಯಾರ್ಥಿ",
    "ವಿಧ್ಯಾರ್ಥಿ": "ವಿದ್ಯಾರ್ಥಿ",
    "ಧನ್ಯವಾದಗಳು": "ಧನ್ಯವಾದಗಳು",
    "ನಮಸಕಾರ": "ನಮಸ್ಕಾರ",
    "ಆರೋಗ್ಯ": "ಆರೋಗ್ಯ",
    "ವ್ಯಕರಣ": "ವ್ಯಾಕರಣ"
};

// Sample Kannada grammar corrections
const grammarRules = [
    {
        wrong: "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ",
        correct: "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ",
        explanation: "ನಾನು ಎಂಬ ಕರ್ತೃಕ್ಕೆ ಹೋಗುತ್ತೇನೆ ಎಂಬ ಕ್ರಿಯಾಪದ ಸೂಕ್ತವಾಗಿದೆ."
    },
    {
        wrong: "ನಾನು ಕೆಲಸ ಮಾಡುತ್ತಾನೆ",
        correct: "ನಾನು ಕೆಲಸ ಮಾಡುತ್ತೇನೆ",
        explanation: "ಕರ್ತೃ ಮತ್ತು ಕ್ರಿಯಾಪದ ಹೊಂದಾಣಿಕೆ ತಪ್ಪಾಗಿದೆ."
    },
    {
        wrong: "ಅವನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ",
        correct: "ಅವನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ",
        explanation: "ಅವನು ಎಂಬ ಕರ್ತೃಕ್ಕೆ ಹೋಗುತ್ತಾನೆ ಸೂಕ್ತವಾಗಿದೆ."
    },
    {
        wrong: "ಅವಳು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ",
        correct: "ಅವಳು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾಳೆ",
        explanation: "ಅವಳು ಎಂಬ ಕರ್ತೃಕ್ಕೆ ಹೋಗುತ್ತಾಳೆ ಸೂಕ್ತವಾಗಿದೆ."
    }
];

// Main checking function
function checkGrammar() {

    const input = document.getElementById("inputText").value;

    const resultBox = document.getElementById("result");
    const correctedBox = document.getElementById("correctedText");

    if (input.trim() === "") {
        resultBox.textContent = "ದಯವಿಟ್ಟು ಕನ್ನಡ ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿ.";
        correctedBox.textContent = "";
        return;
    }

    let corrected = input;
    let messages = [];
    let count = 0;

    // SPELLING CHECK
    if (document.getElementById("spelling").checked) {

        for (const wrong in spellingRules) {

            if (wrong !== spellingRules[wrong]) {

                const pattern = new RegExp(
                    wrong,
                    "gu"
                );

                if (pattern.test(corrected)) {

                    corrected = corrected.replace(
                        pattern,
                        spellingRules[wrong]
                    );

                    messages.push(
                        "Spelling: " + wrong +
                        " → " + spellingRules[wrong]
                    );

                    count++;
                }
            }
        }
    }

    // GRAMMAR CHECK
    if (document.getElementById("grammar").checked) {

        grammarRules.forEach(rule => {

            if (corrected.includes(rule.wrong)) {

                corrected = corrected.replaceAll(
                    rule.wrong,
                    rule.correct
                );

                messages.push(
                    "Grammar: " + rule.explanation
                );

                count++;
            }
        });
    }

    // PUNCTUATION CHECK
    if (document.getElementById("punctuation").checked) {

        let before = corrected;

        // Remove unnecessary spaces before punctuation
        corrected = corrected.replace(/\s+([,.!?।])/gu, "$1");

        // Add space after punctuation when missing
        corrected = corrected.replace(
            /([,.!?।])(?=\S)/gu,
            "$1 "
        );

        // Remove extra spaces
        corrected = corrected.replace(/[ \t]{2,}/gu, " ");

        // Add Kannada full stop if sentence has no ending punctuation
        corrected = corrected.replace(
            /([^\s.!?।])\s*$/u,
            "$1."
        );

        if (before !== corrected) {
            messages.push(
                "Punctuation: ವಿರಾಮ ಚಿಹ್ನೆ ಅಥವಾ ಖಾಲಿ ಜಾಗವನ್ನು ತಿದ್ದಲಾಗಿದೆ."
            );
            count++;
        }
    }

    // DISPLAY RESULTS
    if (messages.length === 0) {

        resultBox.textContent =
            "ಯಾವುದೇ ಮಾದರಿ ತಪ್ಪುಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಇದು ಸಂಪೂರ್ಣ ವ್ಯಾಕರಣ ಪರಿಶೀಲನೆಗೆ ಖಾತರಿ ಅಲ್ಲ.";

    } else {

        resultBox.textContent =
            "Found " + count + " possible correction(s):\n\n" +
            messages.join("\n\n");
    }

    correctedBox.textContent = corrected;
}

// CLEAR TEXT
function clearText() {

    document.getElementById("inputText").value = "";

    document.getElementById("result").textContent =
        "Your results will appear here.";

    document.getElementById("correctedText").textContent =
        "Corrected text will appear here.";
}

// COPY CORRECTED TEXT
function copyText() {

    const text = document.getElementById("correctedText").textContent;

    if (!text || text === "Corrected text will appear here.") {
        alert("No corrected text to copy.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Corrected text copied!"))
        .catch(() => alert("Unable to copy. Please copy manually."));
}
