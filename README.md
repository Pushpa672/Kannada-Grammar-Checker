<!DOCTYPE html>
<html lang="kn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kannada Grammar Checker</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <header>
        <h1>ಕನ್ನಡ ವ್ಯಾಕರಣ ಪರಿಶೀಲಕ</h1>
        <p>Kannada Spelling & Grammar Checker</p>
    </header>

    <main class="container">

        <h2>Check Your Kannada Text</h2>

        <textarea
            id="inputText"
            placeholder="ನಿಮ್ಮ ಕನ್ನಡ ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
        ></textarea>

        <div class="buttons">
            <button onclick="checkGrammar()">
                Check Grammar
            </button>

            <button onclick="clearText()">
                Clear
            </button>
        </div>

        <section class="result">
            <h3>Correction Results</h3>

            <div id="result">
                Your correction results will appear here.
            </div>
        </section>

    </main>

    <footer>
        Kannada Grammar Checker | First Prototype
    </footer>

    <script src="script.js"></script>

</body>
</html>
