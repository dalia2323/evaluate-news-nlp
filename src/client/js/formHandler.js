function handleSubmit(event) {
    event.preventDefault();

    // الحصول على النص المدخل من المستخدم
    let formText = document.getElementById('URI').value;
    if (!formText) {
        console.error("❌ خطأ: لم يتم العثور على إدخال النص!");
        return;
    }
    
    analyzeText(formText);
}

function analyzeText(formText) {
    fetch('http://localhost:8081/userData', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: formText })
    })
    
    .then(res => res.json())
    .then(function(res) {
        let element = document.getElementById('results');
        if (!element) {
            console.error("❌ خطأ: لم يتم العثور على العنصر #results!");
            return;
        }
        console.log("تحليل النص ناجح");
        updateUI(element, res);
    })
    .catch(error => console.error("❌ خطأ في جلب البيانات:", error));
}

export { handleSubmit };
export { analyzeText };
