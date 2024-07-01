const randomNumber = require('./index.js'); // Fonksiyonu içe aktar

describe('randomNumber fonksiyonu', () => {
  // Math.random ve Math.floor fonksiyonlarının orijinal hallerini saklayalım
  const originalMathRandom = Math.random;
  const originalMathFloor = Math.floor;

  // Her testten sonra orijinal fonksiyonları geri yükleyelim
  afterEach(() => {
    Math.random = originalMathRandom;
    Math.floor = originalMathFloor;
  });

  test('String döndürüyor mu?', () => {
    expect(typeof randomNumber()).toBe('string');
  });

  test('Üretilen sayı 0 ile 1000 arasında mı?', () => {
    const result = randomNumber();
    const match = result.match(/(\d+) sayısı (çift|tek) sayıdır/);
    expect(match).not.toBeNull();
    const number = parseInt(match[1], 10);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(1000);
  });

  test('Çift sayı doğru bir şekilde "çift sayıdır" olarak belirtiliyor mu?', () => {
    // Çift sayılar için Math.random fonksiyonunu mocklayalım
    Math.random = jest.fn(() => 0.5); // 0.5 * 1001 = 500.5 -> Math.floor(500.5) = 500 (çift sayı)
    const result = randomNumber();
    expect(result).toMatch(/500 sayısı çift sayıdır/);
  });

  test('Tek sayı doğru bir şekilde "tek sayıdır" olarak belirtiliyor mu?', () => {
    // Tek sayılar için Math.random fonksiyonunu mocklayalım
    Math.random = jest.fn(() => 0.3); // 0.3 * 1001 = 300.3 -> Math.floor(300.3) = 300 (çift sayı)
    // Ancak biz tek sayı istiyoruz, bu yüzden bir ekleyelim
    Math.floor = jest.fn(() => 301); // 301 (tek sayı)
    const result = randomNumber();
    expect(result).toMatch(/301 sayısı tek sayıdır/);
  });
});
