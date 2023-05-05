import { learning_paths as paths } from "./json-collector";

const params = new URLSearchParams(document.location.search);
const presentationMode = params.get("presentation_mode");

if (presentationMode) {
  const body = document.querySelector('body');
  body.classList.add('hidden');
}