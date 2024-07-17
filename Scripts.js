function countBut() {
  const inputText = document.getElementById("inputText");
  //const glasnElement = document.getElementById("glasn");
  //const soglasnElement = document.getElementById("soglasn");
  const text = inputText.value.toLowerCase();
  let vowelsCount = 0;
  let consonantsCount = 0;
  const vowels = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

  for (let i = 0; i < text.length; i++) {
    if (vowels.includes(text[i])) {
      vowelsCount++;
    } else if (text[i] !== " " && text[i] >= "а" && text[i] <= "я") {
      consonantsCount++;
    }
  }
  console.log(
    `В тексте гласных: ${vowelsCount} штук, согласных : ${consonantsCount} штук`
  );
  let glasn = vowelsCount;
  let soglasn = consonantsCount;
  console.log(glasn);
  console.log(soglasn);
  count = 0;
  document.getElementById("glasn").innerText = vowelsCount;
  document.getElementById("soglasn").innerText = consonantsCount;
}
