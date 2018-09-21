var mass = [];
let sum = 0;
VoxEngine.addEventListener(AppEvents.CallAlerting, function(e) {
  e.call.answer();
  e.call.addEventListener(CallEvents.Connected, handleCallConnected);
});

function handleCallConnected(e) {
  e.call.say("Hello! Enter two numbers one by one. After entering each number You will hear notification.", Language.US_ENGLISH_FEMALE);
  e.call.addEventListener(CallEvents.PlaybackFinished, function() {
    if (mass.length >= 2) {
  e.call.say("Now we are going to calculate sum of numbers you have pushed.", Language.US_ENGLISH_FEMALE);
    e.call.addEventListener(CallEvents.PlaybackFinished, calcSum);
    } else {
  e.call.handleTones(true);
  e.call.addEventListener(CallEvents.ToneReceived, handleToneRecieved);  
      }
    });
}

function handleToneRecieved(e) {
  e.call.say(`You have entered a tone: ${e.tone}!`, Language.US_ENGLISH_FEMALE);
  mass.push(e.tone);
}

function calcSum(e) {
  sum = Number(mass[0]) + Number(mass[1]);
    e.call.say(`Sum is equal to: ${sum}. Thank you for your call! I hope we are going to work together!`, Language.US_ENGLISH_FEMALE);
    e.call.addEventListener(CallEvents.PlaybackFinished, function() {
      VoxEngine.terminate();
    });
}