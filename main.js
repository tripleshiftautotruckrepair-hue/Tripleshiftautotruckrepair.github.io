// main.js - handles simple mailto-based form submission
document.addEventListener('DOMContentLoaded',function(){
  function mailtoFromForm(form, subjectPrefix){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      const data = new FormData(form);
      const entries = [];
      for (const [k,v] of data.entries()){
        if (k === 'photo') continue;
        entries.push(k + ': ' + v);
      }
      const body = encodeURIComponent(entries.join('\n'));
      const subject = encodeURIComponent(subjectPrefix + ' - ' + (data.get('name') || 'New request'));
      // use mailto to open user's default mail client
      window.location.href = 'mailto:Tripleshiftautotruckrepair@gmail.com?subject=' + subject + '&body=' + body;
      const resultDiv = document.getElementById(form.id === 'bookingForm' ? 'formResult' : (form.id === 'quoteForm' ? 'quoteResult' : null));
      if (resultDiv){
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Your email client should open to finish sending the form. If it did not, please email Tripleshiftautotruckrepair@gmail.com directly.';
      }
    });
  }

  const booking = document.getElementById('bookingForm');
  if (booking) mailtoFromForm(booking,'Booking Request');

  const quote = document.getElementById('quoteForm');
  if (quote) mailtoFromForm(quote,'Quote Request');

});
