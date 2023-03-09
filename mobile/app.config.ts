export default {
    expo: {
        name: 'TON',
        plugins: [
            [
                'expo-camera',
                {
                    cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
                },
            ],
        ],
        scheme: 'ton',
        slug: 'ton',
        version: '1.0.0',
    },
};
