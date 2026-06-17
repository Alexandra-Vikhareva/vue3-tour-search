// netlify/functions/api-proxy.js

exports.handler = async (event) => {
    // 1. Получаем путь от клиента (например, '/cities?api_key=...')
    const path = event.path.replace('/.netlify/functions/api-proxy', '');

    // 2. Формируем целевой URL для API
    const targetUrl = `https://api.sputnik8.com/v1${path}`;

    try {
        // 3. Делаем запрос к реальному API
        const response = await fetch(targetUrl);
        const data = await response.json();

        // 4. Возвращаем ответ клиенту с правильными CORS-заголовками
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Разрешаем доступ с любого источника
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};