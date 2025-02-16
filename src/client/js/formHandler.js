import axios from "axios";
import { isValidUrl } from "./nameChecker.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const errorElement = document.getElementById("error");
    const input = document.getElementById("URI");

    if (errorElement) {
        hide_error();
    } else {
        console.error("❌ عنصر #error غير موجود في DOM. تأكد من إضافته إلى index.html");
    }

    if (input) {
        input.addEventListener("change", (e) => {
            e.preventDefault();
            hide_error();
            show_results(false);
        });
    } else {
        console.error("❌ عنصر #URI غير موجود في DOM. تأكد من إضافته إلى index.html");
    }
});

// handle the submit
async function handleSubmit(e) {
    e.preventDefault();

    const form = document.querySelector("form");

    if (!isValidUrl(input.value)) {
        show_error();
        document.getElementById("error").innerHTML = "Please, Enter a valid URL";
        input.value = "";
        return;
    }

    loading(true);
    const { data } = await axios.post('http://localhost:8000/', { url: input.value }, {
        headers: { 'Content-Type': 'application/json' }
    });

    display_results(data);
}

//showing the data on the ui
const display_results = data => {
    loading(false);
    if (data.msg) {
        show_error();
        show_results(false);
        document.getElementById("error").innerHTML = `${data.msg}`;
        return;
    }

    hide_error();
    show_results(true);

    document.getElementById("agreement").innerHTML = `Agreement: ${data.sample.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${data.sample.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${data.sample.irony}`;
    document.getElementById("score_tag").innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

const loading = (bool) => {
    const loader = document.getElementById('loader');
    if (bool) {
        loader.style.display = 'block';
        return;
    }
    loader.style.display = 'none';
}

const show_results = (bool) => {
    const listItems = document.querySelectorAll("ul li");
    listItems.forEach(element => {
        element.style.display = bool ? "block" : "none";
    });
}

const show_error = () => {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.style.display = "block";
    }
}

const hide_error = () => {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.style.display = "none";
    }
};

export { handleSubmit };
