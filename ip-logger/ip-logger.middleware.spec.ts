import { IpLoggerMiddleware } from './ip-logger.middleware';

describe('IpLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new IpLoggerMiddleware()).toBeDefined();
  });
});
