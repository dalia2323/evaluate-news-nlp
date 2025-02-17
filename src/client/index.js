import { handleSubmit } from './js/formHandler';
import { analyzeText } from './js/formHandler';
import { updateUI } from './js/updateUI';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/footer.scss';

// جعل handleSubmit متاحًا عالميًا حتى يمكن استدعاؤه من أي مكان
window.handleSubmit = handleSubmit;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('analyze-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error("❌ خطأ: لم يتم العثور على العنصر #analyze-form!");
    }
});

export {
    handleSubmit,
    analyzeText,
    updateUI
};
