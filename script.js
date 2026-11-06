
// KANNADA GRAMMAR CHECKER
// Version 2.0

// SPELLING CORRECTIONS

// KANNADA SPELLING CORRECTIONS - VERSION 3.0

const spellingRules = {
    "ವಿದ್ಯಾರ್ತಿ": "ವಿದ್ಯಾರ್ಥಿ",
    "ವಿಧ್ಯಾರ್ಥಿ": "ವಿದ್ಯಾರ್ಥಿ",
    "ನಮಸಕಾರ": "ನಮಸ್ಕಾರ",
    "ವ್ಯಕರಣ": "ವ್ಯಾಕರಣ",
    "ಪರಿಕ್ಷೆ": "ಪರೀಕ್ಷೆ",
    "ವಿದ್ಯಾಬ್ಯಾಸ": "ವಿದ್ಯಾಭ್ಯಾಸ",
    "ವ್ಯವಸ್ತೆ": "ವ್ಯವಸ್ಥೆ",
    "ಆಶಿರ್ವಾದ": "ಆಶೀರ್ವಾದ",
    "ಸಂತೋಶ": "ಸಂತೋಷ",
    "ಸಹಾಯ್ಯ": "ಸಹಾಯ",
    "ಧನ್ಯವಾದಗಳು": "ಧನ್ಯವಾದಗಳು",
    "ಆರೋಗ್ಯ": "ಆರೋಗ್ಯ",
    "ಶಾಲೆಗೆ": "ಶಾಲೆಗೆ",
    "ಪುಸ್ತಕ": "ಪುಸ್ತಕ",
    "ಕನ್ನಡ": "ಕನ್ನಡ"
};


// GRAMMAR CORRECTIONS
const grammarRules = [
    {
        wrong: "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ",
        correct: "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ",
        explanation: "ನಾನು ಎಂಬ ಕರ್ತೃಕ್ಕೆ ಹೋಗುತ್ತೇನೆ ಎಂಬ ಕ್ರಿಯಾಪದ ಸೂಕ್ತವಾಗಿದೆ."
    },
    {
        wrong: "ನಾನು ಕೆಲಸ ಮಾಡುತ್ತಾನೆ",
        correct: "ನಾನು ಕೆಲಸ ಮಾಡುತ್ತೇನೆ",
        explanation: "ಕರ್ತೃ ಮತ್ತು ಕ್ರಿಯಾಪದ ಹೊಂದಾಣಿಕೆಯನ್ನು ತಿದ್ದಲಾಗಿದೆ."
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

// MAIN CHECKING FUNCTION
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

    // SPELLING CHECK
    if (document.getElementById("spelling").checked) {

        for (const wrong in spellingRules) {

            const pattern = new RegExp(wrong, "gu");

            if (pattern.test(corrected)) {

                corrected = corrected.replace(
                    pattern,
                    spellingRules[wrong]
                );

                messages.push(
                    "Spelling: " + wrong + " → " + spellingRules[wrong]
                );
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
            }
        });
    }

    // PUNCTUATION CHECK
    if (document.getElementById("punctuation").checked) {

        const before = corrected;

        corrected = corrected.replace(/\s+([,.!?।])/gu, "$1");

        corrected = corrected.replace(
            /([,.!?।])(?=\S)/gu,
            "$1 "
        );

        corrected = corrected.replace(/[ \t]{2,}/gu, " ");

        corrected = corrected.replace(
            /([^\s.!?।])\s*$/u,
            "$1."
        );

        if (before !== corrected) {
            messages.push(
                "Punctuation: ವಿರಾಮ ಚಿಹ್ನೆಗಳನ್ನು ತಿದ್ದಲಾಗಿದೆ."
            );
        }
    }

    // DISPLAY RESULTS
    if (messages.length === 0) {

        resultBox.textContent =
            "ಯಾವುದೇ ಮಾದರಿ ತಪ್ಪುಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಇದು ಸಂಪೂರ್ಣ ವ್ಯಾಕರಣ ಪರಿಶೀಲನೆಗೆ ಖಾತರಿ ಅಲ್ಲ.";

    } else {

        resultBox.textContent =
            "Correction Details:\n\n" + messages.join("\n\n");
    }

    correctedBox.textContent = corrected;
}

// CLEAR BUTTON
function clearText() {

    document.getElementById("inputText").value = "";

    document.getElementById("result").textContent =
        "ನಿಮ್ಮ ಫಲಿತಾಂಶ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.";

    document.getElementById("correctedText").textContent =
        "ತಿದ್ದಿದ ಪಠ್ಯ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.";
}

// COPY BUTTON
function copyText() {

    const text = document.getElementById("correctedText").textContent;

    if (!text || text === "ತಿದ್ದಿದ ಪಠ್ಯ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.") {
        alert("ಮೊದಲು ಕನ್ನಡ ಪಠ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("ಪಠ್ಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ Copy ಮಾಡಲಾಗಿದೆ!"))
        .catch(() => alert("Copy ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."));
}

// DOWNLOAD BUTTON
function downloadText() {

    const text = document.getElementById("correctedText").textContent;

    if (!text || text === "ತಿದ್ದಿದ ಪಠ್ಯ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.") {
        alert("ಮೊದಲು ಕನ್ನಡ ಪಠ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ.");
        return;
    }

    const blob = new Blob(
        [text],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Kannada-Corrected-Text.txt";

    link.click();

    URL.revokeObjectURL(url);
}
