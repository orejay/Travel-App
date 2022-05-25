const dotenv = require('dotenv')
dotenv.config()
const geoUrl = process.env.GEON_URL
test('test api values', () => {
    expect(geoUrl).toBe('http://api.geonames.org/searchJSON?q');
  })