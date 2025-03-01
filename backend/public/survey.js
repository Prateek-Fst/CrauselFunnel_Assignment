(function() {
  if (window.location.pathname !== '/cart') return;
  const shop = Shopify.shop;
  const backendUrl = 'https://4zowcs-ip-223-181-34-199.tunnelmole.net';

  console.log('Survey.js loaded on Cart page');
  console.log('Fetching questions from:', `${backendUrl}/api/survey/questions?shop=${shop}`);

  fetch(`${backendUrl}/api/survey/questions?shop=${shop}`)
    .then(response => {
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
        });
      }
      return response.json();
    })
    .then(questions => {
      console.log('Questions received:', questions);

      // Create overlay for popup effect
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      // Create form as popup
      const form = document.createElement('form');
      form.id = 'survey-form';
      form.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        width: 300px;
        max-width: 90%;
        position: relative;
        transform: translateY(100vh);
        animation: slideUp 0.5s ease-out forwards;
      `;

      // Add animation keyframes
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes slideUp {
          to { transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleSheet);

      questions.forEach(q => {
        const label = document.createElement('label');
        label.textContent = q.text;
        label.style.display = 'block';
        label.style.marginBottom = '10px';
        label.style.fontWeight = 'bold';
        form.appendChild(label);
        q.options.forEach(opt => {
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = `q_${q.id}`;
          radio.value = opt;
          radio.style.marginRight = '5px';
          form.appendChild(radio);
          form.appendChild(document.createTextNode(opt));
          form.appendChild(document.createElement('br'));
        });
      });

      const submit = document.createElement('button');
      submit.textContent = 'Submit';
      submit.style.marginTop = '15px';
      submit.style.padding = '8px 16px';
      submit.style.backgroundColor = '#007bff';
      submit.style.color = 'white';
      submit.style.border = 'none';
      submit.style.borderRadius = '4px';
      submit.style.cursor = 'pointer';
      form.appendChild(submit);

      overlay.appendChild(form);
      document.body.appendChild(overlay);
      console.log('Survey popup appended to body');

      form.addEventListener('submit', e => {
        e.preventDefault();
        const responses = {};
        questions.forEach(q => {
          const selected = form.querySelector(`input[name="q_${q.id}"]:checked`);
          if (selected) responses[q.id] = selected.value;
        });
        console.log('Submitting survey:', { shop, responses });
        fetch(`${backendUrl}/api/survey/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shop, responses }),
        })
          .then(res => {
            console.log('Submit response status:', res.status);
            if (res.ok) {
              alert('Thank you!');
              document.body.removeChild(overlay); // Remove popup on success
            } else {
              alert('Error submitting survey');
            }
          })
          .catch(error => console.error('Error submitting survey:', error));
      });
    })
    .then(() => console.log('succesfully completed'))
    .catch(error => console.error('Error fetching questions:', error));
})();