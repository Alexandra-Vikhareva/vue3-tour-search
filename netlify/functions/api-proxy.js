exports.handler = async (event) => {
    // Путь без /api
    const path = event.path.replace(/^\/api/, '');
    // Параметры запроса
    const query = event.queryStringParameters
        ? '?' + new URLSearchParams(event.queryStringParameters).toString()
        : '';
    const targetUrl = `https://api.sputnik8.com/v1${path}${query}`;

    console.log('🔍 targetUrl:', targetUrl); // <-- лог URL

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        console.log('📦 data from API:', JSON.stringify(data)); // <-- лог ответа

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('❌ Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from API' }),
        };
    }
};