// open-close menu modal
const menuBtn = document.getElementById("menu-btn");
const menuClose = document.querySelector(".nav__menu-close-btn");
const menuHamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".nav__mobile-menu");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.add("hidden");
  mobileMenu.classList.remove("hidden");
    mobileMenu.setAttribute("tabindex", "0");
    mobileMenu.focus();
    mobileMenu.addEventListener("keydown", (e) => trapFocus(mobileMenu, e));
})
menuClose.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
  menuBtn.classList.remove("hidden");
})
// open-close select modal
const selectModal = document.querySelector(".modal-overlay");

function openSelectModal() {
  selectModal.classList.remove("hidden");
}
// close select modal
function closeSelectModal() {
  selectModal.classList.add("hidden");
}
// opening the select modal
const rewardBtns = document.querySelectorAll(".main-about__reward-btn");
rewardBtns.forEach(reward => {
  reward.addEventListener("click", openSelectModal);
});

const backProjectBtn = document.getElementById("back-btn");
backProjectBtn.addEventListener("click", openSelectModal);

// Event listener for closing the select modal
const modalCloseBtn = document.getElementById("modal-close-btn");
modalCloseBtn.addEventListener("click", closeSelectModal);

// Show-hide pledge inputs based on selected radio button
const pledges = document.querySelectorAll(".modal__pledge-wrap");
pledges.forEach(pledge => {
  pledge.addEventListener("click", () => {
    pledges.forEach(item => {
      if (item !== pledge) {
        item.lastElementChild.classList.add("hidden");
      }
    });
    pledge.lastElementChild.classList.remove("hidden");
  });
});

// Highlight the selected pledge section
const radios = document.querySelectorAll('input[name="radio"]');
radios.forEach(radio => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.modal__pledge-wrap').forEach(label => {
      label.style.outline = '';
    });

    if (this.checked) {
      const label = this.parentElement.parentElement;
      label.style.outline = '2px solid var(--Moderatecyan)';
    }
  });
});

// Form submission
const successModal = document.querySelector(".modal-overlay--success");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const noRewardRadio = document.querySelector("#radio-btn-1");
  const dollarRadio25 = document.querySelector("#radio-btn-2");
  const dollarInput25 = document.querySelector("#custom-pledge-25");
  const dollarRadio75 = document.querySelector("#radio-btn-3");
  const dollarInput75 = document.querySelector("#custom-pledge-75");

  const isValidNone = noRewardRadio.checked;
  const isValid25 = dollarRadio25.checked ? validatePledgeAmount(dollarInput25, 25) : false;
  const isValid75 = dollarRadio75.checked ? validatePledgeAmount(dollarInput75, 75) : false;

  if (isValidNone || isValid25 || isValid75) {
    setTimeout(() => {
      selectModal.classList.add("hidden");
      successModal.classList.remove("hidden");
        successModal.setAttribute("tabindex", "0");
        successModal.focus();
        successModal.addEventListener("keydown", (e) => trapFocus(successModal, e));
      setTimeout(() => {
      form.submit();
      window.location.reload();
      }, 3000);
    }, 3000);
    
  }
});

function validatePledgeAmount(input, minAmount) {
  const value = input.value;
  if (input.disabled) {
    return true;
  }
  if (value === null || value === "" || value < minAmount) {
    input.style.borderColor = "red";
    return false;
  } else {
    input.style.borderColor = "green";
    return true;
  }
}

// close success modal
const gotItBtn = document.getElementById("got-it-btn");
gotItBtn.addEventListener("click", () => {
  successModal.classList.add("hidden");
}) 

// bookmark button
const bookmarkBtn = document.getElementById("bookmark-btn");
let isBookmarked = false;
bookmarkBtn.addEventListener("click", () => {
  if (isBookmarked) {
    bookmarkBtn.lastElementChild.innerText = "Bookmark";
    bookmarkBtn.lastElementChild.style.color = "";

    bookmarkBtn.classList.remove("main-intro__bookmark-btn--width")
    bookmarkBtn.firstElementChild.firstElementChild.style.color = "";
    bookmarkBtn.firstElementChild.style.backgroundColor = "";
  } else {
    bookmarkBtn.lastElementChild.innerText = "Bookmarked";
    bookmarkBtn.lastElementChild.style.color = "hsl(176, 62%, 29%)";
    
    bookmarkBtn.classList.add("main-intro__bookmark-btn--width")
    bookmarkBtn.firstElementChild.firstElementChild.style.color = "white";
    bookmarkBtn.firstElementChild.style.backgroundColor = "hsl(176, 62%, 29%)";
  }
  isBookmarked = !isBookmarked;
});

// focus trap inside modals
// by https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
function trapFocus(modal, e) {
  const focusableEls = modal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusableEl = focusableEls[0];  
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  if (e.key !== 'Tab' && e.keyCode !== KEYCODE_TAB) {
    return;
  }

  if (e.shiftKey) { // shift + tab
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
      e.preventDefault();
    }
  } else { // tab
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      e.preventDefault();
    }
  }
}
