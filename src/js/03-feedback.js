import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

const formData = {};

populateMessage();

function onInput() {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(e) {
  e.preventDefault();
  if (form.elements.email.value && form.elements.message.value) {
    
  dataLogger({
        email: input.value, message: textarea.value
    });
  e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
   }

}
function dataLogger({email,message}={}) {
  
  return console.log({email,message});
}

function populateMessage() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '');

    form.elements.email.value = savedMessage.email;
    form.elements.message.value = savedMessage.message;
  }
}