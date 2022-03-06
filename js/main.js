import format from 'date-fns/format';
import Cookies from 'js-cookie';
const UI = {
  CHAT: document.querySelector('.chat'),
  SCREEN: document.querySelector('.chat__screen'),
  FORM_CHAT: document.querySelector('.chat__form'),
  INPUT_MESSAGE: document.querySelector('.form__input-message'),
  SEND_BUTTON: document.querySelector('.form__button'),
  TEMPLATE_POST: document.querySelector('.tmpl-message'),
  TEMPLATE_GET: document.querySelector('.get-message'),
  SETTINGS_BTN: document.querySelector('.options__item_settings'),
  SETTINGS_POPUP: document.querySelector('.settings'),
  SETTINGS_CLOSE_BTN: document.querySelector('.settings__close-btn'),
  EXIT_BTN: document.querySelector('.options__item_exit'),
  AUTHORIZATION: document.querySelector('.chat__authorization'),
  AUTHORIZATION_CLOSE_BTN: document.querySelector('.authorization__close-btn'),
  AUTHORIZATION_POST_BTN: document.querySelector('.form-authorization__btn'),
  CONFIRMATION: document.querySelector('.chat__confirmation'),
  CONFIRMATION_CLOSE_BTN: document.querySelector('.confirmation__close-btn'),
  FORMS: document.querySelectorAll('form'),
  EMAIL_INPUT: document.querySelector('.form-authorization__input'),
  TOKEN_INPUT: document.querySelector('.form-confirmation__input'),
  SET_TOKEN_BTN: document.querySelector('.form-confirmation__btn'),
  NAME_FORM: document.querySelector('.form-name'),
  NAME_INPUT: document.querySelector('.form-name__input'),
  NAME_BTN: document.querySelector('.form-name__btn'),
};
const URLS = {
  USER: 'https://chat1-341409.oa.r.appspot.com/api/user',
  ME: 'https://chat1-341409.oa.r.appspot.com/api/user/me',
};

UI.SEND_BUTTON.addEventListener('click', sendMessage);
UI.SETTINGS_BTN.addEventListener('click', showSettings);
UI.EXIT_BTN.addEventListener('click', showAuthorization);
UI.SETTINGS_CLOSE_BTN.addEventListener('click', closeSettings);
UI.AUTHORIZATION_CLOSE_BTN.addEventListener('click', closeAuthorization);
UI.AUTHORIZATION_POST_BTN.addEventListener('click', authorization);
UI.CONFIRMATION_CLOSE_BTN.addEventListener('click', closeConfirmation);
UI.SET_TOKEN_BTN.addEventListener('click', setToken);
UI.NAME_BTN.addEventListener('click', setName);


async function sendRequest(url, method, options) {

}


// async function setName() {
//   const userName = UI.NAME_INPUT.value.trim();
//   const userBody = { name: userName }
//   const token = Cookies.get('token');
//   const response = await fetch(URLS.USER, {
//     method: 'PATCH',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json;charset=utf-8',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(userBody),
//   });
//   closeSettings();
//   UI.NAME_FORM.reset()
//   const result = response.json()
//   getInfoMe()
//   return result
// }
// async function getInfoMe(){
//   const response = await fetch(URLS.ME)
//   const result = await response.json()
//   console.log(result)
//   return result
// }
// async function postEmail(userEmail) {
//   const email = { email: userEmail };
//   const response = await fetch(URLS.USER, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify(email),
//   });
//   const result = await response.json();
//   return result
// }

function authorization() {
  const userEmail = UI.EMAIL_INPUT.value.trim();
  if (userEmail.includes('@') && userEmail.length > 6) {
    postEmail(userEmail);
    showConfirmation();
  }
}
function setToken() {
  const tokenValue = UI.TOKEN_INPUT.value.trim();
  Cookies.set('token', tokenValue);
  closeConfirmation();
}

function showConfirmation() {
  UI.AUTHORIZATION.classList.remove('active');
  UI.CONFIRMATION.classList.add('active');
}

function closeConfirmation() {
  UI.CONFIRMATION.classList.remove('active');
  UI.CHAT.classList.add('active');
}

function showAuthorization() {
  UI.CHAT.classList.remove('active');
  UI.AUTHORIZATION.classList.add('active');
}
function closeAuthorization() {
  UI.AUTHORIZATION.classList.remove('active');
  UI.CHAT.classList.add('active');
}

function showSettings() {
  UI.SETTINGS_POPUP.classList.add('active');
  UI.CHAT.classList.remove('active');
}

function closeSettings() {
  UI.SETTINGS_POPUP.classList.remove('active');
  UI.CHAT.classList.add('active');
}

function sendMessage() {
  const messageValue = UI.INPUT_MESSAGE.value.trim();
  if (messageValue === '') return;
  const message = document.createElement('div');
  message.className = 'screen__message screen__message_post';
  message.append(UI.TEMPLATE_POST.content.cloneNode(true));
  UI.SCREEN.prepend(message);
  const textMessage = message.children[0];
  const dateMessage = message.children[1];
  textMessage.textContent = messageValue;
  dateMessage.textContent = format(new Date(), 'hh : mm');
  UI.FORM_CHAT.reset();
}
function offSubmit() {
  UI.FORMS.forEach((item) =>
    item.addEventListener('submit', (e) => e.preventDefault())
  );
}
offSubmit();
