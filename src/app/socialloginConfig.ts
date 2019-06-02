import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('815639073197-4nm8nn59b9amkgtlsd3eanf65gue20ll.apps.googleusercontent.com')
        }
    ]);

    return config;
}
