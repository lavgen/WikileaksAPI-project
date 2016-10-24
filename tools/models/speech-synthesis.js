///speech synthesis
var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance("hey");
synth.speak(utterance);J