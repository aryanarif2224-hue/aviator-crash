const io = require("socket.io")(process.env.PORT || 3001, {
  cors: { origin: "*" }
});

let multiplier = 1.00;
let gameStatus = "FLYING"; // START, FLYING, CRASHED
let targetCrashPoint = 2.50; // 🎯 यहीं से क्रैश पॉइंट कंट्रोल होगा! (जैसे 2.50x पर क्रैश)

console.log("Aviator backend server started...");

setInterval(() => {
  if (gameStatus === "FLYING") {
    multiplier += 0.05; // ✈️ प्लेन के उड़ने की स्पीड
    
    // अगर प्लेन टारगेट क्रैश पॉइंट पर पहुँच जाए, तो उसे क्रैश कर दो
    if (multiplier >= targetCrashPoint) {
      gameStatus = "CRASHED";
      io.emit("crashPoint", { multiplier: multiplier.toFixed(2), status: gameStatus });
      console.log(`Plane crashed at: ${multiplier.toFixed(2)}x`);
      
      // 5 सेकंड बाद गेम को दोबारा शुरू करें
      setTimeout(() => {
        multiplier = 1.00;
        gameStatus = "FLYING";
        // अगली बार के लिए नया क्रैश पॉइंट (आप इसे अपनी मर्ज़ी से बदल सकते हैं)
        targetCrashPoint = 3.20; 
      }, 5000);
    } else {
      // लाइव उड़ते हुए प्लेन का मल्टिप्लायर भेजें
      io.emit("gameData", { multiplier: multiplier.toFixed(2), status: gameStatus });
    }
  }
}, 100);
