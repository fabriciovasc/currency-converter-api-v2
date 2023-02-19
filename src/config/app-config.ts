interface AppConfig {
  port: number;
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT, 10),
};

export default () => appConfig;
