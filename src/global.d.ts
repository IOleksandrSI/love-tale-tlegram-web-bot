declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp; // Краще визначити точні типи
    };
  }
}