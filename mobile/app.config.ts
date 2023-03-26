export default {
    expo: {
        android: {
            adaptiveIcon: {
                backgroundColor: '#eaf7f9',
                foregroundImage: './src/assets/adaptive-icon.png',
            },
        },
        icon: './src/assets/icon.png',
        name: 'Ton',
        plugins: [
            [
                'expo-camera',
                {
                    cameraPermission: 'Conceda acesso à câmera para $(PRODUCT_NAME).',
                },
            ],
        ],
        scheme: 'ton',
        slug: 'ton',
        splash: {
            image: './src/assets/splash.png',
            backgroundColor: '#eaf7f9',
        },
        version: '1.0.0',
    },
};
