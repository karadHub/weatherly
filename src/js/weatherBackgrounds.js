// This file provides animated SVGs for weather backgrounds based on weather condition.
// Usage: getWeatherBackgroundSVG(condition)

export function getWeatherBackgroundSVG(condition) {
    switch (condition.toLowerCase()) {
        case 'clear':
            return `<svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="80" fill="url(#sunGradient)">
                    <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite"/>
                </circle>
                <defs>
                    <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stop-color="#FFD700"/>
                        <stop offset="100%" stop-color="#FFA500"/>
                    </radialGradient>
                </defs>
            </svg>`;
        case 'rain':
            return `<svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="200" cy="220" rx="90" ry="40" fill="#b3c6e7"/>
                <g>
                    <line x1="170" y1="260" x2="170" y2="300" stroke="#00A9FF" stroke-width="6">
                        <animate attributeName="y1" values="260;300;260" dur="1.2s" repeatCount="indefinite"/>
                        <animate attributeName="y2" values="300;340;300" dur="1.2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="200" y1="260" x2="200" y2="300" stroke="#00A9FF" stroke-width="6">
                        <animate attributeName="y1" values="260;300;260" dur="1.1s" repeatCount="indefinite"/>
                        <animate attributeName="y2" values="300;340;300" dur="1.1s" repeatCount="indefinite"/>
                    </line>
                    <line x1="230" y1="260" x2="230" y2="300" stroke="#00A9FF" stroke-width="6">
                        <animate attributeName="y1" values="260;300;260" dur="1.3s" repeatCount="indefinite"/>
                        <animate attributeName="y2" values="300;340;300" dur="1.3s" repeatCount="indefinite"/>
                    </line>
                </g>
            </svg>`;
        case 'clouds':
            return `<svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="200" cy="220" rx="90" ry="40" fill="#e0e7ff">
                    <animate attributeName="cx" values="200;210;200" dur="4s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="250" cy="210" rx="60" ry="30" fill="#b3c6e7">
                    <animate attributeName="cx" values="250;260;250" dur="4s" repeatCount="indefinite"/>
                </ellipse>
            </svg>`;
        default:
            return '';
    }
}
