import format from 'date-fns/format';
const UI = {
  SCREEN: document.querySelector('.chat__screen'),
  FORM_CHAT: document.querySelector('.chat__form'),
  INPUT_MESSAGE: document.querySelector('.form__input-message'),
  SEND_BUTTON: document.querySelector('.form__button'),
  TEMPLATE_POST: document.querySelector('.tmpl-message'),
  TEMPLATE_GET: document.querySelector('.get-message'),
  SETTINGS_BTN: document.querySelector('.options__item_settings'),
  EXIT_BTN: document.querySelector('.options__item_exit'),
  SETTINGS_POPUP: document.querySelector('.chat__settings')
};

UI.SEND_BUTTON.addEventListener('click', sendMessage);
UI.SETTINGS_BTN.addEventListener('click', showSettings)


function showSettings() {
  UI.SETTINGS_POPUP.classList.add('active')
}

function sendMessage() {
  const messageValue = UI.INPUT_MESSAGE.value.trim();
  if(messageValue === '') return
  const message = document.createElement('div');
  message.className = 'screen__message screen__message_post';
  message.append(UI.TEMPLATE_POST.content.cloneNode(true));
  UI.SCREEN.prepend(message);
  const textMessage = message.children[0];
  const dateMessage = message.children[1];
  textMessage.textContent = messageValue;
  dateMessage.textContent = format(new Date(), 'h : m');
  UI.FORM_CHAT.reset();
}
