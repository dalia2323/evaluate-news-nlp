import { setupFormListener } from '../formHandler';
import fetchMock from 'jest-fetch-mock';

// Enable mock for fetch requests
fetchMock.enableMocks();

beforeEach(() => {
    document.body.innerHTML = `
        <form id="url-form">
            <input id="url" type="text" />
            <button type="submit">Analyze</button>
          <div id="result" style="display: none;">
            <p id="sentiment"></p>
            <pre id="analysis-data"></pre>
        </div>
            </form>
      
    `;

    setupFormListener();
});

afterEach(() => {
    fetchMock.resetMocks();
});

describe('Form Submission Handler', () => {
    test('should alert user when submitting empty URL', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        const form = document.getElementById('url-form');
        form.dispatchEvent(new Event('submit'));

        expect(window.alert).toHaveBeenCalledWith('Please enter a valid URL!');
        expect(document.getElementById('result').style.display).toBe('none');
    });

    test('should correctly process and display sentiment analysis', async () => {
        const mockResponse = {
            sentiment: 'positive',
            sentiment_scores: { positive: 0.85, neutral: 0.1, negative: 0.05 },
        };
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        document.getElementById('url').value = 'https://test.com';

        document.getElementById('url-form').dispatchEvent(new Event('submit'));

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/analyze-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'https://test.com' }),
        });

        const resultContainer = document.getElementById('result');
        expect(resultContainer.style.display).toBe('block');

        expect(document.getElementById('sentiment').innerText).toBe('Sentiment: positive');
        expect(document.getElementById('analysis-data').innerText).toBe(
            JSON.stringify(mockResponse.sentiment_scores, null, 2)
        );
    });

    test('should handle network errors gracefully', async () => {
        fetchMock.mockRejectOnce(new Error('Connection failed'));

        document.getElementById('url').value = 'https://test.com';
        document.getElementById('url-form').dispatchEvent(new Event('submit'));

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(document.getElementById('result').style.display).toBe('block');
        expect(document.getElementById('sentiment').innerText).toBe('Error: Connection failed');
    });
});
